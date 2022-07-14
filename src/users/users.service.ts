import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { criptPassword } from 'src/utils/bcrypt.utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signUp(userDto: UserDto): Promise<UserDto> {
    userDto.password = await criptPassword(userDto.password);
    const checkUserExists = await this.userModel
      .findOne({ email: userDto.email })
      .exec();
    if (!checkUserExists) {
      const createdUser = new this.userModel(userDto);
      const user = await createdUser.save();
      userDto._id = user._id;
      delete userDto.password;
      return userDto;
    } else {
      throw new ConflictException('Email já cadastrado no sistema.');
    }
  }

  async getUserById(id: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException('Usuário não localizado.');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      return user;
    }
  }

  async deleteUser(id: Types.ObjectId): Promise<any> {
    const response = await this.userModel.deleteOne({ _id: id }).exec();
    if (response.deletedCount > 0) {
      return 'Usuário excluído com sucesso';
    } else {
      throw new NotFoundException('Usuário não localizado.');
    }
  }

  async updateUser(id: Types.ObjectId, userDto: UserDto): Promise<User> {
    userDto.password = await criptPassword(userDto.password);
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: userDto },
        { returnOriginal: false },
      )
      .exec();
  }
}
