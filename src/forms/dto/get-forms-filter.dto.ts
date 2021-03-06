import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FormStatus } from '../form.model';

export class GetFormFIlterDto {
  @IsOptional()
  @IsEnum(FormStatus)
  status?: FormStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
