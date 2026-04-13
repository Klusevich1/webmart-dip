import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizSubmission } from '../../entities/quiz-submission.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSubmission]), EmailModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}



