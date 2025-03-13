import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetDto {
  @IsNotEmpty({
    message: 'El correo electrónico es requerido.',
  })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico es inválido.',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'La contraseña es requerida.',
  })
  @IsString()
  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, 1 número y 1 símbolo.',
    },
  )
  password: string;
}
