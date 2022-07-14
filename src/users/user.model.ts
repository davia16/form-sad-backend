import { Document } from 'mongoose';

export enum Profile {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User extends Document {
  email: string;
  password: string;
  profile: Profile;
}
