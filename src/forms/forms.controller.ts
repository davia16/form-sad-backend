import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormFIlterDto } from './dto/get-forms-filter.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './form.model';
import { FormsService } from './forms.service';
import { FormValidationParameter } from './pipes/form-validation-parameter.pipe';

@Controller('/api/v1/forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  @Get()
  getForms(@Query() filterDto: GetFormFIlterDto): Promise<Form[]> {
    if (Object.keys(filterDto).length)
      return this.formsService.getFormsByFilters(filterDto);
    else return this.formsService.getAllForms();
  }

  @Get('/:id')
  getFormById(@Param('id', FormValidationParameter) id: Types.ObjectId): any {
    return this.formsService.getFormById(id);
  }

  @Post()
  createForm(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.createForm(createFormDto);
  }

  @Patch('/:id/status')
  updateFormStatus(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    const { status } = updateFormStatusDto;
    return this.formsService.updateFormStatus(id, status);
  }

  @Put('/:id')
  updateForm(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @Body() updateFormDto: UpdateFormDto,
  ): Promise<Form> {
    return this.formsService.updateForm(id, updateFormDto);
  }

  @Delete('/:id')
  deleteForm(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
  ): Promise<any> {
    return this.formsService.deleteForm(id);
  }
}
