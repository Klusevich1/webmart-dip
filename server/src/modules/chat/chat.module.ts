import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatAiService } from "./chat-ai.service";
import { ChatRequest } from "../../entities/chat-request.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatRequest])],
  controllers: [ChatController],
  providers: [ChatService, ChatAiService],
})
export class ChatModule {}
