import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Priority, Status } from 'src/generated/prisma';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Ticket title',
    required: true,
    minimum: 5,
    example: 'My first ticket',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  title: string;

  @ApiProperty({
    description: 'Ticket description',
    required: true,
    maximum: 5000,
    example: 'This is my first ticket',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(5000, { message: 'Description must be at most 5000 characters' })
  description: string;

  @ApiProperty({
    description: 'Ticket priority',
    required: true,
    enum: Priority,
    example: 'LOW',
  })
  @IsNotEmpty({ message: 'Priority is required' })
  @IsString({ message: 'Priority must be a string' })
  @IsEnum(Priority, { message: 'Priority must be a valid value' })
  priority: Priority;

  @ApiProperty({
    description: 'Ticket status',
    required: true,
    enum: Status,
    example: 'OPEN',
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  @IsEnum(Status, { message: 'Status must be a valid value' })
  status: Status;
}
