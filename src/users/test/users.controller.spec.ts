import { Test } from '@nestjs/testing';
import { UserDto } from '../dto/user.dto';
import { User } from '../user.model';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    let user: User;
    let stub: UserDto;
    beforeEach(async () => {
      stub = await userStub();
      user = await usersController.getUserById(stub._id);
    });
    test('then it should call userService', () => {
      expect(usersService.getUserById).toBeCalledWith(stub._id);
    });
    test('then it should return a user', () => {
      expect(user).toEqual(stub);
    });
  });

  describe('createUser', () => {
    let user: UserDto;
    let stub: UserDto;
    let createUserDto: UserDto;
    beforeEach(async () => {
      stub = await userStub();
      createUserDto = {
        email: stub.email,
        password: stub.password,
        profile: stub.profile,
      };
      user = await usersController.createUser(createUserDto);
    });
    test('then it should call userService', () => {
      expect(usersService.signUp).toHaveBeenCalledWith(createUserDto);
    });
    test('then it should return a user', () => {
      expect(user).toEqual(stub);
    });
  });

  describe('updateUser', () => {
    let user: UserDto;
    let stub: UserDto;
    let updateUserDto: UserDto;
    beforeEach(async () => {
      stub = await userStub();
      updateUserDto = {
        email: stub.email,
        password: stub.password,
        profile: stub.profile,
      };
      user = await usersController.updateUser(stub._id, updateUserDto);
    });
    test('then it should call userService', () => {
      expect(usersService.updateUser).toHaveBeenCalledWith(
        stub._id,
        updateUserDto,
      );
    });
    test('then it should return a edited user', () => {
      expect(user).toEqual(stub);
    });
  });
  describe('deleteUser', () => {
    let user: UserDto;
    let stub: UserDto;
    beforeEach(async () => {
      stub = await userStub();
      user = await usersController.deleteUser(stub._id);
    });
    test('then it should call userService', () => {
      expect(usersService.deleteUser).toHaveBeenCalledWith(stub._id);
    });
    test('then it should return an empty string', () => {
      expect(user).toEqual('');
    });
  });
});
