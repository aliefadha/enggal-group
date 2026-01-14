import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, drive_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Readable } from 'stream';
import { existsSync, readFileSync } from 'node:fs';

@Injectable()
export class GoogleDriveService {
  private readonly logger = new Logger(GoogleDriveService.name);
  private drive: drive_v3.Drive;
  private folderId: string;

  constructor(private configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const serviceAccountPath = this.configService.get<string>(
      'GOOGLE_SERVICE_ACCOUNT_PATH',
    );
    const folderId = this.configService.get<string>('GOOGLE_DRIVE_FOLDER_ID');

    let authClient: JWT;

    if (serviceAccountPath && existsSync(serviceAccountPath)) {
      // Use service account from file path
      const serviceAccount = JSON.parse(
        readFileSync(serviceAccountPath, 'utf-8'),
      );
      authClient = new JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      this.logger.log('Using service account authentication from file');
    } else {
      // Fallback to OAuth2 credentials
      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      const clientSecret = this.configService.get<string>(
        'GOOGLE_CLIENT_SECRET',
      );
      const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');
      const refreshToken = this.configService.get<string>(
        'GOOGLE_REFRESH_TOKEN',
      );

      if (!clientId || !clientSecret || !refreshToken) {
        throw new Error(
          'Google Drive authentication not configured. Set GOOGLE_SERVICE_ACCOUNT_PATH or GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN',
        );
      }

      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri,
      );
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });
      authClient = oauth2Client as unknown as JWT;
      this.logger.log('Using OAuth2 authentication');
    }

    this.drive = google.drive({ version: 'v3', auth: authClient });
    this.folderId = folderId;
    this.logger.log(
      `Google Drive service initialized with folder ID: ${this.folderId || 'default'}`,
    );
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
    mimetype: string,
    folderId?: string,
  ): Promise<{ id: string; webViewLink: string; webContentLink: string }> {
    try {
      const folderIdToUse = folderId || this.folderId;

      const fileMetadata: any = {
        name: filename,
      };

      if (folderIdToUse) {
        fileMetadata.parents = [folderIdToUse];
      }

      const media = {
        mimeType: mimetype,
        body: Readable.from(buffer),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink, webContentLink',
        supportsAllDrives: true,
      });

      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
        supportsAllDrives: true,
      });

      this.logger.log(
        `File uploaded to Google Drive: ${filename} (${response.data.id})`,
      );

      return {
        id: response.data.id,
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webContentLink,
      };
    } catch (error) {
      this.logger.error('Error uploading file to Google Drive', error);
      throw error;
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const folderIdToUse = this.folderId;
      const query = folderIdToUse
        ? `name='${fileName}' and '${folderIdToUse}' in parents and trashed=false`
        : `name='${fileName}' and trashed=false`;

      const listResponse = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)',
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      if (!listResponse.data.files || listResponse.data.files.length === 0) {
        this.logger.warn(`File not found for deletion: ${fileName}`);
        return;
      }

      const filesToDelete = listResponse.data.files;
      for (const file of filesToDelete) {
        const fileId = file.id!;

        try {
          await this.drive.files.update({
            fileId: fileId,
            requestBody: {
              trashed: true,
            },
            supportsAllDrives: true,
          });
          this.logger.log(`File moved to trash: ${fileName} (${fileId})`);
        } catch (updateError) {
          if (updateError.code === 404) {
            this.logger.warn(
              `File ${fileName} (${fileId}) not found for trashing`,
            );
          } else {
            throw updateError;
          }
        }
      }
    } catch (error) {
      this.logger.error('Error moving file to trash in Google Drive', error);
      throw error;
    }
  }

  async getFile(fileId: string): Promise<any> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields:
          'id, name, mimeType, webViewLink, webContentLink, createdTime, size',
        supportsAllDrives: true,
      });

      return response.data;
    } catch (error) {
      this.logger.error('Error getting file from Google Drive', error);
      throw error;
    }
  }

  async listFiles(folderId?: string, pageSize: number = 10): Promise<any> {
    try {
      const folderIdToUse = folderId || this.folderId;

      const query = folderIdToUse
        ? `'${folderIdToUse}' in parents and trashed=false`
        : 'trashed=false';

      const response = await this.drive.files.list({
        q: query,
        pageSize: pageSize,
        fields:
          'files(id, name, mimeType, webViewLink, webContentLink, createdTime, size)',
        orderBy: 'createdTime desc',
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      return response.data.files;
    } catch (error) {
      this.logger.error('Error listing files from Google Drive', error);
      throw error;
    }
  }

  async getFileNameById(fileId: string): Promise<string | null> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'name',
        supportsAllDrives: true,
      });

      return response.data.name || null;
    } catch (error) {
      this.logger.error(`Error getting filename for file ${fileId}`, error);
      return null;
    }
  }

  extractFileIdFromUrl(url: string): string | null {
    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /^([a-zA-Z0-9_-]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  async emptyTrash(): Promise<void> {
    try {
      await this.drive.files.emptyTrash();
      this.logger.log('Trash emptied successfully');
    } catch (error) {
      this.logger.error('Error emptying trash', error);
      throw error;
    }
  }

  async deleteFilePermanently(fileId: string): Promise<void> {
    try {
      await this.drive.permissions.delete({
        fileId: fileId,
        permissionId: 'anyone',
        supportsAllDrives: true,
      });

      await this.drive.files.delete({
        fileId: fileId,
        supportsAllDrives: true,
      });
      this.logger.log(`File permanently deleted: ${fileId}`);
    } catch (error) {
      this.logger.error('Error permanently deleting file', error);
      throw error;
    }
  }

  async listTrashedFiles(pageSize: number = 10): Promise<any> {
    try {
      const response = await this.drive.files.list({
        q: 'trashed=true',
        pageSize: pageSize,
        fields: 'files(id, name, mimeType, createdTime, size)',
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      return response.data.files;
    } catch (error) {
      this.logger.error('Error listing trashed files', error);
      throw error;
    }
  }
}
