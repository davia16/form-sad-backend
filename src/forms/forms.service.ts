import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Form, FormStatus } from './form.model';
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormFIlterDto } from './dto/get-forms-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateFormDto } from './dto/update-form.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { Profile } from '../users/user.model';
import { GoogleDriveService } from '../utils/google-drive.utils';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Telegram } from 'src/utils/telegram.utils';

dotenv.config();
const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

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
          form.eventKind === search ||
          form.date === search ||
          form.cerimonial === search ||
          form.styleKind === search
        );
      });
    }
    return formsResult;
  }

  async uploadFiles(
    files: Array<Express.Multer.File>,
    email: string,
    folderName: string,
  ): Promise<string> {
    const googleDriveService = new GoogleDriveService(
      driveClientId,
      driveClientSecret,
      driveRedirectUri,
      driveRefreshToken,
    );
    let mainFolder = await googleDriveService
      .searchFolder(email.toLowerCase().replace(/\s/g, ''))
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (!mainFolder) {
      mainFolder = await googleDriveService.createFolder(email);
    }
    let folder = await googleDriveService
      .searchFolder(folderName.toLowerCase().replace(/\s/g, ''), mainFolder.id)
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (!folder) {
      folder = await googleDriveService.createFolder(folderName, mainFolder.id);
    }
    if (folder.id) {
      await files.forEach(async (file) => {
        await googleDriveService
          .saveFile(file.filename, file.path, file.mimetype, folder.id)
          .catch((error) => {
            console.error(error);
          });
        fs.unlinkSync(file.path);
      });

      return folder.id;
    } else {
      throw new ServiceUnavailableException(
        'Não foi possível realizar upload das inspirações.',
      );
    }
  }

  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    createFormDto.status = FormStatus.OPEN;
    const createdForm = new this.formModel(createFormDto);
    await new Telegram().sendMessage(createFormDto.name);
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
    const formExcluded: Form = await this.getFormById(id, user);
    const googleDriveService = new GoogleDriveService(
      driveClientId,
      driveClientSecret,
      driveRedirectUri,
      driveRefreshToken,
    );
    await googleDriveService.deleteFileAndFolder(formExcluded.inspirationsPath);
    if (user.profile === Profile.ADMIN) {
      response = await this.formModel.deleteOne({ _id: id }).exec();
    } else {
      response = await this.formModel
        .deleteOne({ email: user.email, _id: id })
        .exec();
    }

    if (response.deletedCount <= 0) {
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
