import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    const userId = 1; //fetch the current authenticated user
    const offers = createInvoiceDto.offerings
    const { offerings, ...invoice } = createInvoiceDto;
    const total = offers.reduce((acc, curr) => acc + Number(curr.price), 0)
    const data = {
      ...invoice,
      total: total,
      user: {
        connect: { id: userId }
      },
      offerings: {
        create: offers
      }
    }
    
    return this.invoiceService.create(data);
  }

  @Get()
  findAll() {
    const userId = 1
    return this.invoiceService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {

    const {  updates, removes, ...invoice} = updateInvoiceDto 
    const deleteSuccess = this.invoiceService.removeOffers(removes);
    const updateSuccess = this.invoiceService.updateOffers(updates)

    return this.invoiceService.update(id, invoice);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
