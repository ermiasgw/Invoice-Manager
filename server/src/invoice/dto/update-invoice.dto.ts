import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsDate, IsDecimal, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { OfferType, Offering } from '@prisma/client';

export class UpdateInvoiceDto {
    @IsNotEmpty()
    currency?: string;

    @IsNotEmpty()
    @IsISO8601() 
    dueDate?: string;

    removes?: number[];

    updates?: UpdateOfferingDto[];
}

export class UpdateOfferingDto {
    id: number;

    @IsNotEmpty()
    name?: string;

    @IsOptional()
    description?: string;

    @IsDecimal()
    @IsPositive()
    price?: number;

    @IsEnum(OfferType)
    type?: OfferType;

}

