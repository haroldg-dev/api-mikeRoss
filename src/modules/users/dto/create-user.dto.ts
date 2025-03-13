import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDate,
  IsArray,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsObject()
  @IsOptional()
  personal_id?: any;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  chat?: any;
}
