import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { Profile } from '../user.model';
export class UserDto {
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  _id?: Types.ObjectId;

  @IsNotEmpty({ message: 'Email não pode ficar em branco.' })
  @IsEmail({ message: 'Formato inválido para o campo email.' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ficar em branco.' })
  @MinLength(8, { message: 'Senha precisa ter no mínimo 8 caracteres.' })
  @MaxLength(20, { message: 'Senha precisa ter no máximo 20 caracteres.' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsNotEmpty({ message: 'Perfil não pode ficar em branco.' })
  profile: Profile;
}
