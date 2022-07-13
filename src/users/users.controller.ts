import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Bind,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UsersController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Get()
  @Bind(Query())
  findAllUsers(query) {
    console.log(query);
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  @Bind(Param('id'))
  findOneUser(id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @Bind(Param('id'), Body())
  updateUser(id, updateUserDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Bind(Param('id'))
  removeUser(id) {
    return `This action removes a #${id} cat`;
  }
}
