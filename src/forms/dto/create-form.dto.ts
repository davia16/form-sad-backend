import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFormDto {
  status: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  event: string;
  @IsNotEmpty()
  eventKind: string;
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  time: string;
  cerimonial: string;
  @IsNotEmpty()
  guestNumber: number;
  @IsNotEmpty()
  locationEvent: string;
  locationCerimony: string;
  locationForniture: string;
  @IsNotEmpty()
  themeStyle: string;
  @IsNotEmpty()
  buffetKind: string;
  @IsNotEmpty()
  whatYouWant: string;
  @IsNotEmpty()
  colorsILike: string;
  @IsNotEmpty()
  colorsIDontLike: string;
  @IsNotEmpty()
  contractedServices: string;
  @IsNotEmpty()
  candyNumbers: number;
  @IsNotEmpty()
  flowersIlike: string;
  @IsNotEmpty()
  flowersIDontLike: string;
  @IsNotEmpty()
  howDidYouFindUs: string;
  @IsNotEmpty()
  cantMissDecorations: string;
  othersInformations: string;
  inspirations: [{ path: string }];
  budget: string;
  contract: string;
}
