import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceCategory } from './service-category.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => ServiceCategory)
  @JoinColumn({ name: 'categoryId' })
  category: ServiceCategory;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column({ type: 'json', nullable: true })
  features: string[];

  @Column({ type: 'json', nullable: true })
  results: string[];

  @Column({ type: 'json', nullable: true })
  packages: Array<{
    name: string;
    price: string;
    features: string[];
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
