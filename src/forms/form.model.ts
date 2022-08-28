import { Document } from 'mongoose';

export enum FormStatus {
  OPEN = 'Aberto',
  BUDGET = 'Orçado',
  CONTRACT = 'Contratado',
  FINISHED = 'Finalizado',
  CANCELED = 'Cancelado',
}

export interface Form extends Document {
  status: FormStatus;
  name: string;
  phone: string;
  address: string;
  email: string;
  eventKind: string;
  date: string;
  time: string;
  styleKind: string;
  cerimonial: string;
  guestNumber: number;
  locationEvent: string;
  locationCerimony: string;
  locationForniture: string;
  pointsComtemplated: string;
  colorsILike: string;
  colorsIDontLike: string;
  whatCantBeMiss: string;
  flowersIlike: string;
  flowersIDontLike: string;
  howDidYouFindUs: string;
  inspirationsPath: string;
  budget: string;
  contract: string;
}
