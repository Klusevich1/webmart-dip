import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { QuizSubmission } from '../../entities/quiz-submission.entity';
import { ContactRequest } from '../../entities/contact-request.entity';
import { ChatRequest } from '../../entities/chat-request.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secureExplicit = process.env.SMTP_SECURE;
    const secure =
      secureExplicit === 'true' ||
      (secureExplicit !== 'false' && (port === 465 || port === 8443));

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number.isFinite(port) ? port : 587,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /** Куда слать уведомления: NOTIFICATION_EMAIL, иначе AGENCY_EMAIL, иначе SMTP_USER */
  private getNotificationTo(): string {
    return (
      process.env.NOTIFICATION_EMAIL ||
      process.env.AGENCY_EMAIL ||
      process.env.SMTP_USER ||
      ''
    ).trim();
  }

  async sendQuizSubmissionEmail(submission: QuizSubmission) {
    const subject = `Новая заявка из квиза - ${submission.name}`;
    const html = this.generateQuizSubmissionHtml(submission);

    await this.sendEmail(this.getNotificationTo(), subject, html);
  }

  async sendContactRequestEmail(request: ContactRequest) {
    const subject = `Новая заявка с сайта - ${request.name}`;
    const html = this.generateContactRequestHtml(request);

    await this.sendEmail(this.getNotificationTo(), subject, html);
  }

  async sendChatRequestEmail(request: ChatRequest) {
    const subject = `Заявка из чата на сайте${request.name ? ` — ${request.name}` : ''}`;
    const html = this.generateChatRequestHtml(request);

    await this.sendEmail(this.getNotificationTo(), subject, html);
  }

  private async sendEmail(to: string, subject: string, html: string) {
    if (!to) {
      const err = new Error(
        'Не задан адрес для уведомлений: укажите NOTIFICATION_EMAIL, AGENCY_EMAIL или SMTP_USER в .env',
      );
      console.error(err.message);
      throw err;
    }
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

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private readonly quizAnswerLabels: Record<string, string> = {
    designType: 'Тип дизайна',
    format: 'Формат',
    purposes: 'Задачи',
    budget: 'Бюджет',
    timeline: 'Сроки',
    businessType: 'Тип бизнеса',
    services: 'Услуги',
    goals: 'Цели',
  };

  private formatContactMethodLabel(method: string): string {
    const map: Record<string, string> = {
      phone: 'По телефону',
      messenger: 'Через мессенджеры',
      email: 'По email',
    };
    return map[method] ?? method;
  }

  private formatQuizAnswersHtml(answers: Record<string, unknown> | null): string {
    if (!answers || typeof answers !== 'object') {
      return '<p style="margin:0;color:#666;"><em>Ответы не переданы</em></p>';
    }

    const keys = Object.keys(answers);
    const preferredOrder = [
      'designType',
      'format',
      'purposes',
      'budget',
      'timeline',
      'businessType',
      'services',
      'goals',
    ];
    const orderedKeys = [
      ...preferredOrder.filter((k) => keys.includes(k)),
      ...keys.filter((k) => !preferredOrder.includes(k)).sort(),
    ];

    const rows: string[] = [];
    for (const key of orderedKeys) {
      const raw = answers[key];
      if (raw === undefined || raw === null || raw === '') continue;

      const label = this.quizAnswerLabels[key] ?? key;
      let display: string;
      if (Array.isArray(raw)) {
        display = raw.map((x) => String(x)).join(', ');
      } else if (typeof raw === 'object') {
        display = JSON.stringify(raw, null, 2);
      } else {
        display = String(raw);
      }

      rows.push(
        `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e8e8e8;vertical-align:top;font-weight:600;width:42%;color:#333;">${this.escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e8e8e8;color:#222;">${this.escapeHtml(display).replace(/\n/g, '<br>')}</td>
        </tr>`,
      );
    }

    if (rows.length === 0) {
      return '<p style="margin:0;color:#666;"><em>Нет ответов</em></p>';
    }

    return `<table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.45;">${rows.join('')}</table>`;
  }

  private generateQuizSubmissionHtml(submission: QuizSubmission): string {
    const answersBlock = this.formatQuizAnswersHtml(
      submission.answers as Record<string, unknown>,
    );
    const contactMethodLabel = this.formatContactMethodLabel(
      submission.contactMethod,
    );

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DD009F;">Новая заявка из квиза</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top:0;">Контактная информация</h3>
          <p><strong>Имя:</strong> ${this.escapeHtml(submission.name)}</p>
          <p><strong>Телефон:</strong> ${this.escapeHtml(submission.phone)}</p>
          <p><strong>Предпочитаемый способ связи:</strong> ${this.escapeHtml(contactMethodLabel)}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top:0;">Ответы на вопросы квиза</h3>
          ${answersBlock}
        </div>

        <p style="color: #666; font-size: 12px;">
          Отправлено: ${this.escapeHtml(submission.createdAt.toLocaleString('ru-RU'))}
        </p>
      </div>
    `;
  }

  private generateContactRequestHtml(request: ContactRequest): string {
    const msgHtml = request.message
      ? this.escapeHtml(request.message).replace(/\n/g, '<br>')
      : '';
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DD009F;">Новая заявка с сайта</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Контактная информация:</h3>
          <p><strong>Имя:</strong> ${this.escapeHtml(request.name)}</p>
          <p><strong>Телефон:</strong> ${this.escapeHtml(request.phone)}</p>
          ${request.email ? `<p><strong>Email:</strong> ${this.escapeHtml(request.email)}</p>` : ''}
          ${request.company ? `<p><strong>Компания:</strong> ${this.escapeHtml(request.company)}</p>` : ''}
          ${request.sourcePage ? `<p><strong>Источник:</strong> ${this.escapeHtml(request.sourcePage)}</p>` : ''}
        </div>

        ${request.message ? `
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Сообщение:</h3>
            <p>${msgHtml}</p>
          </div>
        ` : ''}

        <p style="color: #666; font-size: 12px;">
          Отправлено: ${this.escapeHtml(request.createdAt.toLocaleString('ru-RU'))}
        </p>
      </div>
    `;
  }

  private generateChatRequestHtml(request: ChatRequest): string {
    const msgHtml = this.escapeHtml(request.message).replace(/\n/g, '<br>');
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DD009F;">Заявка из чата</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${request.name ? `<p><strong>Имя:</strong> ${this.escapeHtml(request.name)}</p>` : ''}
          ${request.contact ? `<p><strong>Контакт:</strong> ${this.escapeHtml(request.contact)}</p>` : ''}
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Текст заявки / переписка:</h3>
          <p>${msgHtml}</p>
        </div>

        <p style="color: #666; font-size: 12px;">
          Отправлено: ${this.escapeHtml(request.createdAt.toLocaleString('ru-RU'))}
        </p>
      </div>
    `;
  }
}
