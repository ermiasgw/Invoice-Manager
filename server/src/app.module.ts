import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DatabaseModule } from './database/database.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [UsersModule, AuthModule, InvoiceModule, DatabaseModule, ExportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
