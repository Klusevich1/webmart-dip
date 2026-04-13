import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactRequestDto } from '../../dto/contact-request.dto';

@Controller('contact-requests')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactRequestDto: CreateContactRequestDto) {
    return this.contactService.create(createContactRequestDto);
  }
}


