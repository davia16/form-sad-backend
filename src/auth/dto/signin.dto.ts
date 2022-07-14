import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignIn {
  @IsNotEmpty({ message: 'Email não pode ficar em branco.' })
  @IsEmail({ message: 'Formato inválido para o campo email.' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ficar em branco.' })
  @MinLength(8, { message: 'Senha precisa ter no mínimo 8 caracteres.' })
  @MaxLength(20, { message: 'Senha precisa ter no máximo 20 caracteres.' })
  password: string;
}
