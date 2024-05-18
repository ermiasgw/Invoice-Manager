import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto, OfferingDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto, UpdateOfferingDto } from './dto/update-invoice.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: DatabaseService) {}
  
  async create(data: Prisma.InvoiceCreateInput) {
    return this.prisma.invoice.create({
      data: data,
      include: {
        offerings: true
      }
    });
  }

  async findAll(id: number) {
    return this.prisma.invoice.findMany({
      where: {
        userId: id,
      },
    })
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        offerings: true
      }
    });
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    };

    return invoice
  }

  async update(id: string, data: Prisma.InvoiceUpdateInput) {
    const offers = (await this.findOne(id)).offerings;
    data['total'] = offers.reduce((acc, curr) => acc + Number(curr.price), 0);
    return this.prisma.invoice.update({
      where: {
        id,
      },
      data,
      include: {
        offerings: true
      }
    })
  }

  async remove(id: string) {
    const invoice = await this.findOne(id)

    return this.prisma.invoice.delete({
      where: {
        id,
      }
    })
  }

  async removeOffers(ids: number[]) {
    return this.prisma.offering.deleteMany({
      where: {
        id: {
          in: ids
        },
      }
    })
  }

  async updateOffers(updates: UpdateOfferingDto[]) {
    for (const update of updates) {
      const { id, ...data } = update;
      const offer = await this.prisma.offering.findUnique({
        where: {
          id,
        }
      })
      console.log(offer)
      if (offer){
        await this.prisma.offering.update({
          where: { id },
          data
        });
      }
      
    }
  }
}
