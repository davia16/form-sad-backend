import { Types } from 'mongoose';
import { UserDto } from '../../dto/user.dto';
import { Profile } from '../../user.model';

export const userStub = async (): Promise<UserDto> => {
  return {
    _id: new Types.ObjectId('62d01ab178a890c318ea3b79'),
    email: 'teste@test.com',
    profile: Profile.ADMIN,
    password: '12345678',
  };
};
