import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';


@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('/pdf')
  async exportAll(@Res({ passthrough: true }) res: Response) {
    const userId = 1
    const buffer = await this.exportService.exportAll(userId);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=invoices.zip'
    });

    return new StreamableFile(buffer);
  }

  @Get('/pdf/:id')
  async exportOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const buffer = await this.exportService.exportOne(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice_${id}.pdf`
    });

    return new StreamableFile(buffer);
  }

  @Get('/excel')
  async exportExcel(@Res({ passthrough: true }) res: Response) {
    const userId = 1
    const buffer = await this.exportService.exportExcel(userId);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="invoices.xlsx"',
    });

    return new StreamableFile(buffer);
  }
}