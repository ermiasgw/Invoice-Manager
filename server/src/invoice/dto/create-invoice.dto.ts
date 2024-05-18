import { OfferType, Prisma, User } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsDecimal, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, ValidateNested, isISO8601 } from "class-validator";

export class CreateInvoiceDto {
    @IsNotEmpty()
    currency: string;

    @IsNotEmpty()
    @IsISO8601() 
    dueDate: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OfferingDto)
    offerings: OfferingDto[]
}

export class OfferingDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @Type(()=>Number)
    price: number;

    @IsEnum(OfferType)
    type: OfferType;
}