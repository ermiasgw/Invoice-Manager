import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DatabaseModule } from './database/database.module';
import { ExportModule } from './export/export.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [UsersModule, AuthModule, InvoiceModule, DatabaseModule, ExportModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
