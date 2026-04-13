import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatAiService } from './chat-ai.service';
import { CreateChatRequestDto } from '../../dto/chat-request.dto';
import { ChatAiMessageDto } from '../../dto/chat-ai.dto';

@Controller('chat-requests')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatAiService: ChatAiService,
  ) {}

  @Post()
  async create(@Body() createChatRequestDto: CreateChatRequestDto) {
    return this.chatService.create(createChatRequestDto);
  }

  @Post('ai-message')
  async getAiResponse(@Body() dto: ChatAiMessageDto) {
    console.log('[Chat] ai-message request, messages:', dto.messages?.length ?? 0);
    const text = await this.chatAiService.getResponse(dto.messages ?? []);
    console.log('[Chat] ai-message response length:', text?.length ?? 0);
    return { text };
  }
}



