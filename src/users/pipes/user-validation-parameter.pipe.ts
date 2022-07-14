import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

export class UserValidationParameter implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      value = new Types.ObjectId(value);
      return value;
    } catch (error) {
      throw new BadRequestException(
        `Param ${metadata.data} is incorrect format`,
      );
    }
  }
}
