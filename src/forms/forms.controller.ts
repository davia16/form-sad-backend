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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
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
  @UseGuards(AuthGuard())
  getForms(
    @Query() filterDto: GetFormFIlterDto,
    @GetUser() user: UserDto,
  ): Promise<Form[]> {
    return this.formsService.getFormsByFilters(filterDto, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getFormById(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @GetUser() user: UserDto,
  ): any {
    return this.formsService.getFormById(id, user);
  }

  @Post()
  createForm(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.createForm(createFormDto);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateFormStatus(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
    @GetUser() user: UserDto,
  ): Promise<Form> {
    const { status } = updateFormStatusDto;
    return this.formsService.updateFormStatus(id, status, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updateForm(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @Body() updateFormDto: UpdateFormDto,
    @GetUser() user: UserDto,
  ): Promise<Form> {
    return this.formsService.updateForm(id, updateFormDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteForm(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @GetUser() user: UserDto,
  ): Promise<any> {
    return this.formsService.deleteForm(id, user);
  }
}
