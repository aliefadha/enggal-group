import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private readonly logger = new Logger(GoogleDriveService.name);
  private drive;
  private folderId: string;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');
    const refreshToken = this.configService.get<string>('GOOGLE_REFRESH_TOKEN');

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    this.drive = google.drive({ version: 'v3', auth: oauth2Client });
    this.folderId = this.configService.get<string>('GOOGLE_DRIVE_FOLDER_ID');
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
      });

      // Make file publicly accessible (optional - remove if you want private files)
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      this.logger.log(`File uploaded to Google Drive: ${filename} (${response.data.id})`);

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

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });

      this.logger.log(`File deleted from Google Drive: ${fileId}`);
    } catch (error) {
      this.logger.error('Error deleting file from Google Drive', error);
      throw error;
    }
  }

  async getFile(fileId: string): Promise<any> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, webViewLink, webContentLink, createdTime, size',
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

      const query = folderIdToUse ? `'${folderIdToUse}' in parents and trashed=false` : 'trashed=false';

      const response = await this.drive.files.list({
        q: query,
        pageSize: pageSize,
        fields: 'files(id, name, mimeType, webViewLink, webContentLink, createdTime, size)',
        orderBy: 'createdTime desc',
      });

      return response.data.files;
    } catch (error) {
      this.logger.error('Error listing files from Google Drive', error);
      throw error;
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
}
