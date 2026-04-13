import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizSubmission } from '../../entities/quiz-submission.entity';
import { CreateQuizSubmissionDto } from '../../dto/quiz-submission.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizSubmission)
    private quizSubmissionRepository: Repository<QuizSubmission>,
    private emailService: EmailService,
  ) {}

  async create(createQuizSubmissionDto: CreateQuizSubmissionDto) {
    const submission = this.quizSubmissionRepository.create(createQuizSubmissionDto);
    const savedSubmission = await this.quizSubmissionRepository.save(submission);

    // Send email notification
    try {
      await this.emailService.sendQuizSubmissionEmail(savedSubmission);
    } catch (error) {
      console.error('Failed to send quiz submission email:', error);
      // Don't fail the request if email sending fails
    }

    return {
      success: true,
      message: 'Quiz submission saved successfully',
      id: savedSubmission.id,
    };
  }
}



