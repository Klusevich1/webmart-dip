import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { QuizSubmission } from '../../entities/quiz-submission.entity';
import { ContactRequest } from '../../entities/contact-request.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendQuizSubmissionEmail(submission: QuizSubmission) {
    const subject = `Новая заявка из квиза - ${submission.name}`;
    const html = this.generateQuizSubmissionHtml(submission);

    await this.sendEmail(process.env.AGENCY_EMAIL || 'webmart@site.com', subject, html);
  }

  async sendContactRequestEmail(request: ContactRequest) {
    const subject = `Новая заявка с сайта - ${request.name}`;
    const html = this.generateContactRequestHtml(request);

    await this.sendEmail(process.env.AGENCY_EMAIL || 'webmart@site.com', subject, html);
  }

  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  private generateQuizSubmissionHtml(submission: QuizSubmission): string {
    const answers = JSON.stringify(submission.answers, null, 2);

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DD009F;">Новая заявка из квиза</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Контактная информация:</h3>
          <p><strong>Имя:</strong> ${submission.name}</p>
          <p><strong>Телефон:</strong> ${submission.phone}</p>
          <p><strong>Предпочитаемый способ связи:</strong> ${submission.contactMethod}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Ответы на вопросы квиза:</h3>
          <pre style="white-space: pre-wrap; font-family: monospace;">${answers}</pre>
        </div>

        <p style="color: #666; font-size: 12px;">
          Отправлено: ${submission.createdAt.toLocaleString('ru-RU')}
        </p>
      </div>
    `;
  }

  private generateContactRequestHtml(request: ContactRequest): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DD009F;">Новая заявка с сайта</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Контактная информация:</h3>
          <p><strong>Имя:</strong> ${request.name}</p>
          <p><strong>Телефон:</strong> ${request.phone}</p>
          ${request.email ? `<p><strong>Email:</strong> ${request.email}</p>` : ''}
          ${request.sourcePage ? `<p><strong>Источник:</strong> ${request.sourcePage}</p>` : ''}
        </div>

        ${request.message ? `
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Сообщение:</h3>
            <p>${request.message.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}

        <p style="color: #666; font-size: 12px;">
          Отправлено: ${request.createdAt.toLocaleString('ru-RU')}
        </p>
      </div>
    `;
  }
}
