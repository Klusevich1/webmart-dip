import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export type ContactMethod = 'phone' | 'messenger' | 'email';

@Entity('quiz_submissions')
export class QuizSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  answers: Record<string, any>;

  @Column()
  contactMethod: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;
}
