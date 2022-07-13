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
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormFIlterDto } from './dto/get-forms-filter.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './form.model';
import { FormsService } from './forms.service';

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
  getFormById(@Param('id') id: string): any {
    return this.formsService.getFormById(id);
  }

  @Post()
  createForm(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.createForm(createFormDto);
  }

  @Patch('/:id/status')
  updateFormStatus(
    @Param('id') id: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    const { status } = updateFormStatusDto;
    return this.formsService.updateFormStatus(id, status);
  }

  @Put('/:id')
  updateForm(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
  ): Promise<Form> {
    return this.formsService.updateForm(id, updateFormDto);
  }

  @Delete('/:id')
  deleteForm(@Param('id') id: string): Promise<any> {
    return this.formsService.deleteForm(id);
  }
}
