import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizSubmissionDto } from '../../dto/quiz-submission.dto';

@Controller('quiz-submissions')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizSubmissionDto: CreateQuizSubmissionDto) {
    return this.quizService.create(createQuizSubmissionDto);
  }
}



