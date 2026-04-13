import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export type ContactMethod = 'phone' | 'messenger' | 'email';

export class CreateQuizSubmissionDto {
  @IsObject()
  answers: Record<string, any>;

  @IsEnum(['phone', 'messenger', 'email'])
  contactMethod: ContactMethod;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}



