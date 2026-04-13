import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRequest } from '../../entities/chat-request.entity';
import { CreateChatRequestDto } from '../../dto/chat-request.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRequest)
    private chatRequestRepository: Repository<ChatRequest>,
  ) {}

  async create(createChatRequestDto: CreateChatRequestDto) {
    const chatRequest = this.chatRequestRepository.create(createChatRequestDto);
    const savedRequest = await this.chatRequestRepository.save(chatRequest);

    return {
      success: true,
      message: 'Chat request saved successfully',
      id: savedRequest.id,
    };
  }
}



