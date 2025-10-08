import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma.service';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { Prisma } from 'src/generated/prisma';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({ data: createTicketDto });
  }

  async findAll(queryTicketDto: QueryTicketDto) {
    const { search, page, pageSize, sortBy, sortOrder } = queryTicketDto;
    const where: Prisma.TicketWhereInput = {};
    if (search?.title) {
      where.title = {
        contains: search.title,
        mode: 'insensitive',
      };
    }
    if (search?.description) {
      where.description = {
        contains: search.description,
        mode: 'insensitive',
      };
    }
    if (search?.priority) {
      where.priority = search.priority;
    }
    if (search?.status) {
      where.status = search.status;
    }
    const [tickets, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);
    return {
      data: tickets,
      total,
      totalPages: Math.ceil(total / pageSize),
      page,
      pageSize,
    };
  }

  findOne(id: string) {
    return this.prisma.ticket.findUnique({ where: { id } });
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({ where: { id }, data: updateTicketDto });
  }

  remove(id: string) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
