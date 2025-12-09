import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');
    const refreshToken = this.configService.get<string>('GOOGLE_REFRESH_TOKEN');

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    this.sheets = google.sheets({ version: 'v4', auth: oauth2Client });
  }

  async appendRow(spreadsheetId: string, range: string, values: any[][]) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      this.logger.log(`Row appended successfully: ${response.data.updates?.updatedRange}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error appending row to spreadsheet', error);
      throw error;
    }
  }

  async getSheetData(spreadsheetId: string, range: string) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      return response.data.values;
    } catch (error) {
      this.logger.error('Error getting sheet data', error);
      throw error;
    }
  }

  async batchUpdate(spreadsheetId: string, requests: any[]) {
    try {
      const response = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests,
        },
      });

      this.logger.log('Batch update completed successfully');
      return response.data;
    } catch (error) {
      this.logger.error('Error performing batch update', error);
      throw error;
    }
  }
  async updateRow(spreadsheetId: string, range: string, rowIndex: number, values: any[]) {
    try {
      // Convert 1-based row index to 0-based for API
      const actualRange = `${range.split('!')[0]}!${this.getColumnLetter(1)}${rowIndex}:${this.getColumnLetter(values.length)}${rowIndex}`;

      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: actualRange,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [values],
        },
      });

      this.logger.log(`Row ${rowIndex} updated successfully: ${response.data.updatedRange}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error updating row ${rowIndex} in spreadsheet`, error);
      throw error;
    }
  }

  async findRowById(spreadsheetId: string, range: string, dbId: string): Promise<number> {
    try {
      // Get all data from the range to search for the ID in Column A
      const sheetData = await this.getSheetData(spreadsheetId, range);

      if (!sheetData || sheetData.length === 0) {
        this.logger.warn('No data found in spreadsheet');
        return -1;
      }

      // Search for the database ID in Column A (index 0)
      for (let i = 0; i < sheetData.length; i++) {
        const row = sheetData[i];
        if (row && row[0] === dbId) {
          // Return 1-based row number for compatibility with updateRow
          return i + 1;
        }
      }

      this.logger.warn(`Database ID ${dbId} not found in spreadsheet`);
      return -1;
    } catch (error) {
      this.logger.error('Error finding row by ID', error);
      throw error;
    }
  }

  async deleteRow(spreadsheetId: string, range: string, rowIndex: number): Promise<void> {
    try {
      // Clear the entire row (columns A to H, which is 8 columns)
      const actualRange = `${range.split('!')[0]}!${this.getColumnLetter(0)}${rowIndex}:${this.getColumnLetter(7)}${rowIndex}`;

      // Clear the row by updating it with 8 empty values (for columns A-H)
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: actualRange,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['', '', '', '', '', '', '', '']], // 8 empty values for columns A-H
        },
      });

      this.logger.log(`Row ${rowIndex} cleared successfully from spreadsheet`);
    } catch (error) {
      this.logger.error(`Error deleting row ${rowIndex} from spreadsheet`, error);
      throw error;
    }
  }

  async getRowData(spreadsheetId: string, range: string, rowIndex: number): Promise<any[]> {
    try {
      // Convert 1-based row index to 0-based for API
      const sheetData = await this.getSheetData(spreadsheetId, range);

      if (!sheetData || sheetData.length === 0) {
        return [];
      }

      // Adjust for 0-based indexing and header row
      const adjustedIndex = rowIndex - 1;
      if (adjustedIndex < 0 || adjustedIndex >= sheetData.length) {
        this.logger.warn(`Row index ${rowIndex} out of bounds`);
        return [];
      }

      return sheetData[adjustedIndex] || [];
    } catch (error) {
      this.logger.error(`Error getting row data for row ${rowIndex}`, error);
      throw error;
    }
  }

  private getColumnLetter(columnIndex: number): string {
    // Convert 0-based column index to Excel column letter (A, B, C, etc.)
    let result = '';
    let num = columnIndex + 1; // Convert to 1-based

    while (num > 0) {
      num--;
      result = String.fromCharCode(65 + (num % 26)) + result;
      num = Math.floor(num / 26);
    }

    return result;
  }
}
