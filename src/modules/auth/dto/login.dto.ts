import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
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
  password: string;
}
