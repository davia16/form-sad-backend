import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FormsModule } from './forms/forms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    FormsModule,
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test' ? process.env.URI_TEST : process.env.URI,
    ),
    AuthModule,
  ],
})
export class AppModule {}
