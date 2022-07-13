import { Injectable, NotFoundException } from '@nestjs/common';
import { Form, FormStatus } from './form.model';
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormFIlterDto } from './dto/get-forms-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {
  constructor(@InjectModel('Form') private formModel: Model<Form>) {}

  getAllForms(): Promise<Form[]> {
    return this.formModel.find({}).exec();
  }

  async getFormsByFilters(filterDto: GetFormFIlterDto): Promise<Form[]> {
    const { status, search } = filterDto;
    let formsResult: Form[] = [];
    if (status) {
      formsResult = await this.formModel
        .find({ status: FormStatus[status] })
        .exec();
    } else {
      formsResult = await this.getAllForms();
    }
    if (search) {
      formsResult = formsResult.filter((form) => {
        form.event.includes(search) ||
        form.date.includes(search) ||
        form.themeStyle.includes(search)
          ? true
          : false;
      });
    }
    return formsResult;
  }

  createForm(createFormDto: CreateFormDto): Promise<Form> {
    createFormDto.status = FormStatus.OPEN;
    const createdForm = new this.formModel(createFormDto);
    return createdForm.save();
  }

  async getFormById(id: string): Promise<Form> {
    const form = await this.formModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
    if (!form) {
      throw new NotFoundException('Formulário não localizado.');
    }
    return form;
  }

  async deleteForm(id: string): Promise<any> {
    const response = await this.formModel
      .deleteOne({ _id: new Types.ObjectId(id) })
      .exec();
    if (response.deletedCount > 0) {
      return 'Formulário excluído com sucesso';
    } else {
      throw new NotFoundException('Formulário não localizado.');
    }
  }

  async updateForm(id: string, updateForm: UpdateFormDto) {
    const form = await this.formModel
      .findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: updateForm })
      .exec();
    return form.save();
  }

  async updateFormStatus(id: string, status: FormStatus) {
    const form = await this.formModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
    form.status = FormStatus[status];
    return form.save();
  }
}
