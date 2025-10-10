import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 201,
        },
        message: {
          type: 'string',
          example: 'The record has been successfully created.',
        },
        data: {
          $ref: getSchemaPath(CreateTicketDto),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'array',
          items: {
            type: 'string',
            example: 'Ticket title is required',
          },
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  })
  async create(@Body() createTicketDto: CreateTicketDto) {
    const { id } = await this.ticketsService.create(createTicketDto);
    return { id, message: 'The record has been successfully created.' };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(CreateTicketDto),
          },
        },
        total: { type: 'number', example: 1 },
        totalPages: { type: 'number', example: 1 },
        page: { type: 'number', example: 1 },
        pageSize: { type: 'number', example: 10 },
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Fetch all tickets' },
      },
    },
  })
  async findAll(@Query() query: QueryTicketDto) {
    const tickets = await this.ticketsService.findAll(query);
    return {
      ...tickets,
      message: 'Fetch all tickets',
      statusCode: 200,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Ticket found' },
        data: {
          $ref: getSchemaPath(CreateTicketDto),
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'Ticket not found',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return {
      statusCode: 200,
      message: 'Ticket found',
      data: ticket,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: {
          type: 'string',
          example: 'The record has been successfully updated.',
        },
        data: {
          $ref: getSchemaPath(CreateTicketDto),
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    await this.ticketsService.update(id, updateTicketDto);
    return {
      statusCode: 200,
      message: 'The record has been successfully updated.',
      data: await this.ticketsService.findOne(id),
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: {
          type: 'string',
          example: 'The record has been successfully deleted.',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'Ticket not found',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  })
  async remove(@Param('id') id: string) {
    await this.ticketsService.remove(id);
    return {
      statusCode: 200,
      message: 'The record has been successfully deleted.',
    };
  }
}
