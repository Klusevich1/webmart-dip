import { IsArray } from 'class-validator';

export class ChatAiMessageDto {
  @IsArray()
  messages: { role: string; text: string }[];
}
