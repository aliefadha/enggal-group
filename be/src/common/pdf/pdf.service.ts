import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit');
import * as fs from 'fs/promises';
import * as path from 'path';
import { MEMBERSHIP_TEMPLATE } from 'src/api/membership/membership-template.constants';
import type { MembershipTemplateConfig } from 'src/api/membership/membership-template.types';

@Injectable()
export class PdfService {
  generateMembershipCard(membership: {
    membershipId: string;
    nama: string;
    email: string;
    no_hp: string;
    jenis_kelamin: string;
    kota: string;
    tanggal_lahir: Date;
    createdAt: Date;
  }): Promise<Buffer> {
    return new Promise(async (resolve) => {
      let config: MembershipTemplateConfig;
      try {
        const configContent = await fs.readFile(
          MEMBERSHIP_TEMPLATE.CONFIG_FILE,
          'utf-8',
        );
        config = JSON.parse(configContent) as MembershipTemplateConfig;
      } catch {
        config = { ...MEMBERSHIP_TEMPLATE.DEFAULT_CONFIG };
      }

      const doc = new PDFDocument({
        size: [336, 192],
        margins: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      });

      const fontPath = path.join(process.cwd(), 'fonts', 'runestars.ttf');
      doc.registerFont('Runestars', fontPath);

      const buffers: Buffer[] = [];

      doc.on('data', (buffer) => {
        buffers.push(buffer);
      });

      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      const frontImagePath = path.join(
        process.cwd(),
        'uploads',
        'membership-card-front.png',
      );

      let useTemplate = false;

      try {
        await fs.access(frontImagePath);
        doc.image(frontImagePath, 0, 0, { cover: [336, 192], align: 'center', valign: 'center' });
        useTemplate = true;
      } catch {
        doc.rect(0, 0, 336, 192).fill('#f8f9fa');
        doc.rect(0, 0, 336, 36).fill('#A71D28');

        doc
          .fillColor('#ffffff')
          .fontSize(11)
          .font('Runestars')
          .text('Enggal Group Indonesia', 12, 14, { align: 'left' })
          .fontSize(8)
          .font('Runestars')
          .text('Kartu Membership', 12, 28, { align: 'left' });
      }

      doc
        .fillColor('#FFFFFF')
        .fontSize(config.fontSize * 0.9)
        .font('Runestars')
        .text(`${membership.membershipId}`, 24, 20, { align: 'left' });

      this.drawTextWithShadow(
        doc,
        membership.nama,
        24,
        54,
        {
          shadowColor: '#FFB835',
          textColor: config.textColor,
          fontSize: config.fontSize * 0.9,
          font: 'Runestars',
          width: 312,
        },
      );

      doc
        .fillColor(config.textColor)
        .fontSize(config.fontSize * 0.6)
        .font('Runestars')
        .text(membership.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' }), 46, 95, { width: 312 });

      doc
        .fillColor(config.textColor)
        .fontSize(config.fontSize * 0.6)
        .font('Runestars')
        .text(membership.no_hp, 120, 95, { width: 312 });

      const backImagePath = path.join(
        process.cwd(),
        'uploads',
        'membership-card-back.png',
      );

      try {
        await fs.access(backImagePath);
        doc.addPage({ size: [336, 192] });
        doc.image(backImagePath, 0, 0, { cover: [336, 192], align: 'center', valign: 'center' });
      } catch {
        // No back image - skip second page
      }

      doc.end();
    });
  }

  private drawTextWithShadow(
    doc: any,
    text: string,
    x: number,
    y: number,
    options: {
      shadowColor: string;
      textColor: string;
      fontSize: number;
      font: string;
      width?: number;
      align?: any;
    },
  ): void {
    const { shadowColor, textColor, fontSize, font, width, align } = options;
    const textOptions = width ? { width, align } : {};

    const shadowOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    shadowOffsets.forEach(([ox, oy]) => {
      doc
        .fillColor(shadowColor)
        .fontSize(fontSize)
        .font(font)
        .text(text, x + ox, y + oy, textOptions);
    });

    doc.fillColor(textColor).fontSize(fontSize).font(font).text(text, x, y, textOptions);
  }
}
