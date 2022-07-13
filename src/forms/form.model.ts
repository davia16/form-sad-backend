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
  email: string;
  address: string;
  event: string;
  eventKind: string;
  date: string;
  time: string;
  cerimonial: string;
  guestNumber: number;
  locationEvent: string;
  locationCerimony: string;
  locationForniture: string;
  themeStyle: string;
  buffetKind: string;
  whatYouWant: string;
  colorsILike: string;
  colorsIDontLike: string;
  contractedServices: string;
  candyNumbers: number;
  flowersIlike: string;
  flowersIDontLike: string;
  howDidYouFindUs: string;
  cantMissDecorations: string;
  othersInformations: string;
  inspirations: [{ path: string }];
  budget: string;
  contract: string;
}
