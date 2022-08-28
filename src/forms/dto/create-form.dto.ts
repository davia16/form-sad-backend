import { IsEmail, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { FormStatus } from '../form.model';

export class CreateFormDto {
  @IsOptional()
  status: FormStatus;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  eventKind: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  styleKind: string[]; //Estilo apenas

  @IsNotEmpty()
  @IsPositive()
  guestNumber: number;

  cerimonial: string; //cerimonial tem ou n tem aqui guarda apenas o nome caso tenha se não deixar vazio

  @IsNotEmpty()
  locationEvent: string;

  locationCerimony: string; // Mesmo cenário do cerimonial

  locationForniture: string;

  @IsNotEmpty()
  pointsContemplated: string[];

  @IsNotEmpty()
  buffetKind: string;

  @IsNotEmpty()
  whatYouWant: string;

  @IsNotEmpty()
  colorsILike: string;

  @IsNotEmpty()
  colorsIDontLike: string;

  @IsNotEmpty()
  contractedServices: string[];

  @IsNotEmpty()
  @IsPositive()
  candyNumbers: number;

  @IsNotEmpty()
  flowersIlike: string;

  @IsNotEmpty()
  flowersIDontLike: string;

  @IsNotEmpty()
  howDidYouFindUs: string;
  @IsNotEmpty()
  inspirations: string[];
  inspirationsPath: string;
}
