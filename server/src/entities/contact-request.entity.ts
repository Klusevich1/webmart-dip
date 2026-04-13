import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('contact_requests')
export class ContactRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  sourcePage: string;

  @CreateDateColumn()
  createdAt: Date;
}



