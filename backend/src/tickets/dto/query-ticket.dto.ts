import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { SearchTicketDto } from './search-ticket.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryTicketDto {
  @ApiPropertyOptional({
    type: SearchTicketDto,
    example: {
      title: 'My first ticket',
      description: 'This is my first ticket',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchTicketDto)
  search?: SearchTicketDto;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page size must be an integer' })
  @Min(1, { message: 'Page size must be at least 1' })
  @Max(100, { message: 'Page size must be at most 100' })
  pageSize: number = 10;

  @ApiPropertyOptional({ example: 'id' })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy: string = 'id';

  @ApiPropertyOptional({ example: 'asc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'], { message: 'Sort order must be "asc" or "desc"' })
  sortOrder: 'asc' | 'desc' = 'asc';
}
