import { IsEnum } from 'class-validator';
import { FormStatus } from '../form.model';

export class UpdateFormStatusDto {
  @IsEnum(FormStatus)
  status: FormStatus;
}
