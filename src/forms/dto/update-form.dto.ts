import { IsEnum } from 'class-validator';
import { FormStatus } from '../form.model';
import { CreateFormDto } from './create-form.dto';

export class UpdateFormDto extends CreateFormDto {
  @IsEnum(FormStatus)
  status: FormStatus;
}
