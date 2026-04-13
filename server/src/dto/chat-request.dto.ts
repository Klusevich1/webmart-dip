import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}



