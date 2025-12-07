import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleSheetsService } from 'src/common/google-sheets/google-sheets.service';
import { RequestUserCareerCreateDto } from 'src/api/user-career/dto/requests/create.dto';
import { RequestUserCareerUpdateDto } from 'src/api/user-career/dto/requests/update.dto';

@Injectable()
export class UserCareerService {
  private readonly logger = new Logger(UserCareerService.name);

  constructor(
    private prisma: PrismaService,
    private googleSheets: GoogleSheetsService,
    private configService: ConfigService,
  ) { }

  async create(dto: RequestUserCareerCreateDto) {
    const createdCareer = await this.prisma.userCareer.create({
      data: {
        tanggal: new Date(dto.tanggal),
        nama: dto.nama,
        no_hp: dto.no_hp,
        email: dto.email,
        alamat: dto.alamat,
        cv_link: dto.cv_link,
        status: dto.status,
      },
    });

    // Append to Google Sheets in the background
    this.appendToGoogleSheets(createdCareer).catch((error) => {
      this.logger.error('Failed to append to Google Sheets', error);
    });

    return createdCareer;
  }

  private async appendToGoogleSheets(career: any) {
    const spreadsheetId = this.configService.get<string>('GOOGLE_SHEETS_CAREER_SPREADSHEET_ID');
    const range = this.configService.get<string>('GOOGLE_SHEETS_CAREER_RANGE') || 'Sheet1!A:H';

    if (!spreadsheetId) {
      this.logger.warn('Google Sheets spreadsheet ID not configured, skipping append');
      return;
    }

    const row = [
      [
        career.id, // HIDDEN: Database ID in Column A
        `${String(career.tanggal.getMonth() + 1).padStart(2, '0')}-${String(career.tanggal.getDate()).padStart(2, '0')}-${career.tanggal.getFullYear()}`,
        career.nama,
        `0${career.no_hp}`,
        career.email,
        career.alamat,
        career.cv_link,
        career.status,
      ],
    ];

    await this.googleSheets.appendRow(spreadsheetId, range, row);
    this.logger.log(`Career application appended to Google Sheets: ${career.id}`);
  }

  private async updateGoogleSheets(career: any): Promise<void> {
    const spreadsheetId = this.configService.get<string>('GOOGLE_SHEETS_CAREER_SPREADSHEET_ID');
    const range = this.configService.get<string>('GOOGLE_SHEETS_CAREER_RANGE') || 'Sheet1!A:H';

    if (!spreadsheetId) {
      this.logger.warn('Google Sheets spreadsheet ID not configured, skipping update');
      return;
    }

    try {
      // Find the row by database ID (hidden in Column A)
      const rowIndex = await this.googleSheets.findRowById(spreadsheetId, range, career.id);

      if (rowIndex === -1) {
        this.logger.warn(`Row not found for career ID: ${career.id}, will append as new row`);
        await this.appendToGoogleSheets(career);
        return;
      }

      // Prepare updated row data (visible columns B-H)
      const updatedRow = [
        `${String(career.tanggal.getMonth() + 1).padStart(2, '0')}-${String(career.tanggal.getDate()).padStart(2, '0')}-${career.tanggal.getFullYear()}`,
        career.nama,
        `0${career.no_hp}`,
        career.email,
        career.alamat,
        career.cv_link,
        career.status,
      ];

      // Update the row (columns B-H, maintaining hidden ID in A)
      await this.googleSheets.updateRow(spreadsheetId, range, rowIndex, updatedRow);
      this.logger.log(`Career application updated in Google Sheets: ${career.id}`);

    } catch (error) {
      this.logger.error('Failed to update Google Sheets', error);
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    startDate,
    endDate,
    status,
  }: {
    page?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    status?: any;
  }) {
    const skip = (page - 1) * limit;
    const where: Prisma.UserCareerWhereInput = {};

    if (startDate || endDate) {
      where.tanggal = {};
      if (startDate) {
        where.tanggal.gte = startDate;
      }
      if (endDate) {
        where.tanggal.lte = endDate;
      }
    }

    if (status) {
      where.status = status;
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.userCareer.count({ where }),
      this.prisma.userCareer.findMany({
        skip,
        take: limit,
        orderBy: { tanggal: 'desc' },
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: string) {
    const item = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('UserCareer not found');
    }
    return item;
  }

  async update(id: string, dto: RequestUserCareerUpdateDto) {
    const existing = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('UserCareer not found');
    }

    const updatedCareer = await this.prisma.userCareer.update({
      where: { id },
      data: {
        tanggal: dto.tanggal ? new Date(dto.tanggal) : undefined,
        nama: dto.nama ?? undefined,
        no_hp: dto.no_hp ?? undefined,
        email: dto.email ?? undefined,
        alamat: dto.alamat ?? undefined,
        cv_link: dto.cv_link ?? undefined,
        status: dto.status ?? undefined,
      },
    });

    // Update Google Sheets in background
    this.updateGoogleSheets(updatedCareer).catch((error) => {
      this.logger.error('Failed to update Google Sheets', error);
    });

    return updatedCareer;
  }

  async remove(id: string) {
    const existing = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('UserCareer not found');
    }
    await this.prisma.userCareer.delete({ where: { id } });
    return { success: true };
  }
}
