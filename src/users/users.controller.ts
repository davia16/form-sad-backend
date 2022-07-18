import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserValidationParameter } from './pipes/user-validation-parameter.pipe';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard())
  createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.signUp(userDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getUserById(
    @Param('id', UserValidationParameter) id: Types.ObjectId,
  ): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', UserValidationParameter) id: Types.ObjectId,
    @Body() userDto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteUser(
    @Param('id', UserValidationParameter) id: Types.ObjectId,
  ): Promise<any> {
    return this.usersService.deleteUser(id);
  }
}
