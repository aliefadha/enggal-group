import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets;
  private isInitialized = false;

  constructor(private configService: ConfigService) {
    const serviceAccountPath = this.configService.get<string>(
      'GOOGLE_SERVICE_ACCOUNT_JSON_PATH',
    );
    const serviceAccountJson = this.configService.get<string>(
      'GOOGLE_SERVICE_ACCOUNT_JSON',
    );

    // Default to secrets/service-key.json if no env var set
    const defaultPath = path.resolve(process.cwd(), 'secrets/service-key.json');
    const filePath = serviceAccountPath || defaultPath;

    if (!serviceAccountJson && !fs.existsSync(filePath)) {
      this.logger.warn(
        `Google Sheets not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_SERVICE_ACCOUNT_JSON_PATH, or create ${defaultPath}`,
      );
      return;
    }

    try {
      let credentials;

      if (serviceAccountJson) {
        // Read from environment variable
        credentials = JSON.parse(serviceAccountJson);
        this.logger.log('Google Sheets: Loaded Service Account from env var');
      } else {
        // Read from file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        credentials = JSON.parse(fileContent);
        this.logger.log(
          `Google Sheets: Loaded Service Account from ${filePath}`,
        );
      }

      if (!credentials.client_email || !credentials.private_key) {
        this.logger.error(
          'Service Account JSON is missing client_email or private_key',
        );
        return;
      }

      const jwtClient = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: jwtClient });
      this.isInitialized = true;
      this.logger.log(
        'Google Sheets initialized with Service Account authentication',
      );
    } catch (error) {
      this.logger.error(
        'Failed to initialize Google Sheets with Service Account',
        error,
      );
    }
  }

  private checkInitialized() {
    if (!this.isInitialized || !this.sheets) {
      throw new Error(
        'GoogleSheetsService is not initialized. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_PATH in your .env file.',
      );
    }
  }

  async appendRow(spreadsheetId: string, range: string, values: any[][]) {
    this.checkInitialized();
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      this.logger.log(
        `Row appended successfully: ${response.data.updates?.updatedRange}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error appending row to spreadsheet', error);
      throw error;
    }
  }

  async appendRowToTable(
    spreadsheetId: string,
    range: string,
    values: any[][],
  ) {
    this.checkInitialized();
    try {
      // Get current sheet data to find the last row with data
      const sheetData = await this.getSheetData(spreadsheetId, range);

      let nextRowIndex = 2; // Default to row 2 (after header)

      if (sheetData && sheetData.length > 0) {
        // Find the last row that has actual data (not just empty rows)
        let lastDataRowIndex = -1;

        for (let i = 0; i < sheetData.length; i++) {
          const row = sheetData[i];
          // Check if row has any non-empty values
          const hasData =
            row &&
            row.some(
              (cell) => cell !== undefined && cell !== null && cell !== '',
            );

          if (hasData) {
            lastDataRowIndex = i;
          }
        }

        // Calculate next row index (1-based)
        if (lastDataRowIndex >= 0) {
          nextRowIndex = lastDataRowIndex + 2; // +1 for 0-based to 1-based, +1 for next row
        }
      }

      // Calculate the range for the new row
      const sheetName = range.split('!')[0];
      const startColumn = this.getColumnLetter(0);
      const endColumn = this.getColumnLetter(values[0].length - 1);
      const actualRange = `${sheetName}!${startColumn}${nextRowIndex}:${endColumn}${nextRowIndex}`;

      // Insert the row at the calculated position
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: actualRange,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      this.logger.log(
        `Row appended to table at row ${nextRowIndex}: ${response.data.updatedRange}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error appending row to table in spreadsheet', error);
      throw error;
    }
  }

  async getSheetData(spreadsheetId: string, range: string) {
    this.checkInitialized();
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
    this.checkInitialized();
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
  async updateRow(
    spreadsheetId: string,
    range: string,
    rowIndex: number,
    values: any[],
  ) {
    this.checkInitialized();
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

      this.logger.log(
        `Row ${rowIndex} updated successfully: ${response.data.updatedRange}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error updating row ${rowIndex} in spreadsheet`, error);
      throw error;
    }
  }

  async findRowById(
    spreadsheetId: string,
    range: string,
    dbId: string,
  ): Promise<number> {
    this.checkInitialized();
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

  async deleteRow(
    spreadsheetId: string,
    range: string,
    rowIndex: number,
  ): Promise<void> {
    this.checkInitialized();
    try {
      // Clear the entire row (columns A to H, which is 8 columns)
      const actualRange = `${range.split('!')[0]}!${this.getColumnLetter(0)}${rowIndex}:${this.getColumnLetter(10)}${rowIndex}`;

      // Clear the row by updating it with 8 empty values (for columns A-H)
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: actualRange,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['', '', '', '', '', '', '', '', '', '', '']], // 11 empty values for columns A-K
        },
      });

      this.logger.log(`Row ${rowIndex} cleared successfully from spreadsheet`);
    } catch (error) {
      this.logger.error(
        `Error deleting row ${rowIndex} from spreadsheet`,
        error,
      );
      throw error;
    }
  }

  async getRowData(
    spreadsheetId: string,
    range: string,
    rowIndex: number,
  ): Promise<any[]> {
    this.checkInitialized();
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
