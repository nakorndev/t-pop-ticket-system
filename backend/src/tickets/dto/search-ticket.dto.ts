import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Priority, Status } from 'src/generated/prisma';

export class SearchTicketDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
