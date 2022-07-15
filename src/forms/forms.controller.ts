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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { Logger } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { diskStorage } from 'multer';
@Controller('/api/v1/forms')
export class FormsController {
  private logger = new Logger('FormsController');
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
  @UseInterceptors(
    FilesInterceptor('inspirations', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createForm(
    @Body() createFormDto: CreateFormDto,
    @UploadedFiles() inspirations: Array<Express.Multer.File>,
  ): Promise<Form> {
    createFormDto.inspirations = new Array<string>();
    inspirations.forEach((file) => {
      createFormDto.inspirations.push(file.path);
    });
    this.logger.verbose('Creating form for user ' + createFormDto.email);
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
  @UseInterceptors(
    FilesInterceptor('inspirations', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateForm(
    @Param('id', FormValidationParameter) id: Types.ObjectId,
    @Body() updateFormDto: UpdateFormDto,
    @GetUser() user: UserDto,
    @UploadedFiles()
    inspirations: Array<Express.Multer.File>,
  ): Promise<Form> {
    updateFormDto.inspirations = new Array<string>();
    inspirations.forEach((file) => {
      updateFormDto.inspirations.push(file.path);
    });
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
