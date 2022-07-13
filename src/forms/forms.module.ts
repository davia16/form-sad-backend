import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSchema } from './form.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Form', schema: FormSchema }])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
