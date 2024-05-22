import { Injectable, NotFoundException, Res, ResponseDecoratorOptions } from '@nestjs/common';
import { Invoice, Offering } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import * as PDFDocument from 'pdfkit';
import * as JSZip from 'jszip';
import * as ExcelJS from 'exceljs';
import blobStream from 'blob-stream';


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
      include : {
        offerings: true
      }
    })

    const user = await this.prisma.user.findUnique({
      where:{
        id,
      }
    })

    if (!invoices) {
      throw new NotFoundException('Invoice not found');
    }
    return await this.generateInvoiceZip(invoices, user); 
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
      include : {
        offerings: true
      }
    })

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const userId = invoice.userId
    const user = await this.prisma.user.findUnique({
      where:{
        id: userId,
      }
    })

    return await this.generateInvoicePDF(invoice, user);

  }

  async generateInvoiceZip(invoices: Invoice[], user): Promise<Buffer> {
    const zip = new JSZip();
  
    for (const invoice of invoices) {
      const pdfBuffer = await this.generateInvoicePDF(invoice, user);
      zip.file(`invoice_${invoice.id}.pdf`, pdfBuffer);
    }
  
    return zip.generateAsync({ type: 'nodebuffer' });
  }

  async generateInvoicePDF(invoiceData: any, user): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();

        // Define buffers array to collect data chunks
        const buffers: Buffer[] = [];
        
        // Event handler to collect data buffers
        doc.on('data', buffer => buffers.push(buffer));
        
        // Event handler to resolve with concatenated buffer when PDF generation is complete
        doc.on('end', () => resolve(Buffer.concat(buffers)));
 

        const tableData = [
          ["Name", "Description", "Status", "Type", "Price"],
          ...invoiceData.offerings.map(item => [item.name, item.description, "Active", "Product", item.price])
      ];
        // Function to draw a table
        const drawTable = (data, doc, startX, startY, rowHeight, columnWidths) => {
            data.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    const x = startX + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
                    const y = startY + rowIndex * rowHeight;
                    doc.rect(x, y, columnWidths[colIndex], rowHeight).stroke(); // Draw cell border
                    doc.text(cell, x + 5, y + 10); // Add cell text
                });
            });
        };

    
        doc.fontSize(9).text(`Name: ${user.name}`, 50, 70, { align: 'left' });
        doc.fontSize(9).text(`Email: ${user.email}`, 50, 85, { align: 'left' });
        doc.fontSize(9).text(`Invoice Id: ${invoiceData.id}`, 50, 100, { align: 'left' });
        doc.fontSize(9).text(`Date: ${invoiceData.dueDate}`, 50, 115, { align: 'left' });

        doc.fontSize(9).text(`Client name: Liam Johnson`, 400, 70, { align: 'right' });
        doc.fontSize(9).text(`Client email: liam@example.com`, 400, 85, { align: 'right' });
        doc.fontSize(9).text(`Invoice status: active`, 400, 100, { align: 'right' });
        doc.fontSize(9).text(`Total: ${invoiceData.total} Birr`, 400, 115, { align: 'right' });

        // Draw the table
        drawTable(tableData, doc, 50, 200, 30, [100, 80, 80, 100, 80, 100]);

        // End the document
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




