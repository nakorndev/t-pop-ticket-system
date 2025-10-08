import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Priority, Status } from 'src/generated/prisma';

export class CreateTicketDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(5000, { message: 'Description must be at most 5000 characters' })
  description: string;

  @IsNotEmpty({ message: 'Priority is required' })
  @IsString({ message: 'Priority must be a string' })
  @IsEnum(Priority, { message: 'Priority must be a valid value' })
  priority: Priority;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  @IsEnum(Status, { message: 'Status must be a valid value' })
  status: Status;
}
