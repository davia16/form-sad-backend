import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Form, FormStatus } from './form.model';
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormFIlterDto } from './dto/get-forms-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateFormDto } from './dto/update-form.dto';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { Profile } from 'src/users/user.model';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel('Form') private formModel: Model<Form>,
    private userService: UsersService,
  ) {}

  async getFormsByFilters(
    filterDto: GetFormFIlterDto,
    user: UserDto,
  ): Promise<Form[]> {
    const { status, search } = filterDto;
    let formsResult: Form[] = [];
    if (user.profile === Profile.ADMIN) {
      if (status) {
        formsResult = await this.formModel
          .find({ status: FormStatus[status] })
          .exec();
      } else {
        formsResult = await this.formModel.find({}).exec();
      }
    } else {
      if (status) {
        formsResult = await this.formModel
          .find({ email: user.email, status: FormStatus[status] })
          .exec();
      } else {
        formsResult = await this.formModel.find({ email: user.email }).exec();
      }
    }
    if (search) {
      return await formsResult.filter((form) => {
        return (
          form.event === search ||
          form.date === search ||
          form.themeStyle === search
        );
      });
    }
    return formsResult;
  }

  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    createFormDto.status = FormStatus.OPEN;
    const createdForm = new this.formModel(createFormDto);
    const userDto: UserDto = {
      email: createFormDto.email,
      password: createFormDto.cpf,
      profile: Profile.USER,
    };
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      await this.userService.signUp(userDto);
    }
    return createdForm.save();
  }

  async getFormById(id: Types.ObjectId, user: UserDto): Promise<Form> {
    let form;
    if (user.profile === Profile.ADMIN) {
      form = await this.formModel.findOne({ _id: id }).exec();
    } else {
      form = await this.formModel
        .findOne({ email: user.email, _id: id })
        .exec();
    }
    if (!form) {
      throw new NotFoundException('Formulário não localizado.');
    }
    return form;
  }

  async deleteForm(id: Types.ObjectId, user: UserDto): Promise<any> {
    let response;
    if (user.profile === Profile.ADMIN) {
      response = await this.formModel.deleteOne({ _id: id }).exec();
    } else {
      response = await this.formModel
        .deleteOne({ email: user.email, _id: id })
        .exec();
    }

    if (response.deletedCount > 0) {
      return 'Formulário excluído com sucesso';
    } else {
      throw new NotFoundException('Formulário não localizado.');
    }
  }

  async updateForm(
    id: Types.ObjectId,
    updateForm: UpdateFormDto,
    user: UserDto,
  ): Promise<Form> {
    if (user.profile === Profile.ADMIN) {
      return this.formModel
        .findOneAndUpdate(
          { _id: id },
          { $set: updateForm },
          { returnOriginal: false },
        )
        .exec();
    } else {
      return this.formModel
        .findOneAndUpdate(
          { email: user.email, _id: id },
          { $set: updateForm },
          { returnOriginal: false },
        )
        .exec();
    }
  }

  async updateFormStatus(
    id: Types.ObjectId,
    status: FormStatus,
    user: UserDto,
  ) {
    if (user.profile === Profile.ADMIN) {
      const form = await this.formModel.findOne({ _id: id }).exec();
      form.status = FormStatus[status];
      return form.save();
    } else {
      throw new UnauthorizedException(
        'Sem permissão para realizar esta operação.',
      );
    }
  }
}
