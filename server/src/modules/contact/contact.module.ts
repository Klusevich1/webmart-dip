import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRequest } from '../../entities/contact-request.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRequest]), EmailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}


