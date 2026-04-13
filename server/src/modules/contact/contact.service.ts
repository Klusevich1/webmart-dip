import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactRequest } from '../../entities/contact-request.entity';
import { CreateContactRequestDto } from '../../dto/contact-request.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactRequest)
    private contactRequestRepository: Repository<ContactRequest>,
    private emailService: EmailService,
  ) {}

  async create(createContactRequestDto: CreateContactRequestDto) {
    const contactRequest = this.contactRequestRepository.create(createContactRequestDto);
    const savedRequest = await this.contactRequestRepository.save(contactRequest);

    // Send email notification
    try {
      await this.emailService.sendContactRequestEmail(savedRequest);
    } catch (error) {
      console.error('Failed to send contact request email:', error);
      // Don't fail the request if email sending fails
    }

    return {
      success: true,
      message: 'Contact request saved successfully',
      id: savedRequest.id,
    };
  }
}


