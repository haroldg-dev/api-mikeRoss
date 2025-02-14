import { IsBoolean, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsOptional()
    @IsString()
    userName?: string;

    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsOptional()
    @IsString()
    lastThreadId?: string;

    @IsOptional()
    @IsString()
    lastThreadStatus?: string;

    @IsNotEmpty()
    @IsNumber()
    totalMessages: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsBoolean()
    activeBot: boolean;
}
