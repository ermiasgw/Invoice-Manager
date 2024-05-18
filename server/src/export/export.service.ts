import { Injectable, NotFoundException, Res, ResponseDecoratorOptions } from '@nestjs/common';
import { Invoice, Offering } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as PDFDocument from 'pdfkit';
import * as JSZip from 'jszip';
import * as ExcelJS from 'exceljs';

interface InvoiceAndOffering extends Invoice{
  offerings: Offering[];
}

@Injectable()
export class ExportService {
  constructor(private prisma: DatabaseService) {}
  
  async exportAll(id: number){
    const invoices = await this.prisma.invoice.findMany({
      where: {
        userId: id,
      },
    })
    if (!invoices) {
      throw new NotFoundException('Invoice not found');
    }
    return await this.generateInvoiceZip(invoices); 
  }
  async exportExcel(id: number){
    const invoices = await this.prisma.invoice.findMany({
      where: {
        userId: id,
      },
      include : {
        offerings: true
      }
    })
    if (!invoices) {
      throw new NotFoundException('Invoice not found');
    }
    return await this.generateInvoiceExcel(invoices); 
  }
  async exportOne(id: string){
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id,
      },
    })
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return await this.generateInvoicePDF(invoice);

  }

  async generateInvoiceZip(invoices: Invoice[]): Promise<Buffer> {
    const zip = new JSZip();
  
    for (const invoice of invoices) {
      const pdfBuffer = await this.generateInvoicePDF(invoice);
      zip.file(`invoice_${invoice.id}.pdf`, pdfBuffer);
    }
  
    return zip.generateAsync({ type: 'nodebuffer' });
  }

  async generateInvoicePDF(invoiceData: Invoice): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      // Customize PDF document as per your invoice design
      doc.fontSize(16).text(`Invoice ${invoiceData.id}`, { align: 'center' });
      doc.fontSize(12).text(`Total Amount: ${invoiceData.total}`, { align: 'center' });
      // Add more invoice details as needed
  
      const buffers: Buffer[] = [];
      doc.on('data', buffer => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });
  }

  async generateInvoiceExcel(invoices: InvoiceAndOffering[]): Promise<Uint8Array> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Balance Sheet');

    // Add headers for invoices
    worksheet.addRow(['Invoice ID', 'Total Amount', 'Due Date', 'Currency']);
    worksheet.mergeCells('A1:D1');

    // Add headers for offerings
    worksheet.addRow(['Offering ID', 'Name', 'Description', 'Price', 'Type', 'Invoice ID']);
    worksheet.mergeCells('A2:F2');

    // Add data rows for invoices and offerings
    invoices.forEach(invoice => {
      worksheet.addRow([invoice.id, invoice.total, invoice.dueDate, invoice.currency]);
      worksheet.addRow(['Offering ID', 'Name', 'Description', 'Price', 'Type', 'Invoice ID']);
      invoice.offerings.forEach(offering => {
        worksheet.addRow([offering.id, offering.name, offering.description, offering.price, offering.type, offering.invoiceId]);
      });
      worksheet.addRow([]); // Add empty row between invoices
    });

    // Write workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return new Uint8Array(buffer);
  }
}




