import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRequest } from '../../entities/chat-request.entity';
import { CreateChatRequestDto } from '../../dto/chat-request.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRequest)
    private chatRequestRepository: Repository<ChatRequest>,
    private emailService: EmailService,
  ) {}

  async create(createChatRequestDto: CreateChatRequestDto) {
    const chatRequest = this.chatRequestRepository.create(createChatRequestDto);
    const savedRequest = await this.chatRequestRepository.save(chatRequest);

    try {
      await this.emailService.sendChatRequestEmail(savedRequest);
    } catch (error) {
      console.error('Failed to send chat request email:', error);
    }

    return {
      success: true,
      message: 'Chat request saved successfully',
      id: savedRequest.id,
    };
  }
}



