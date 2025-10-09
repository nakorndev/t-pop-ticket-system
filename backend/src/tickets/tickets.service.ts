import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma.service';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { Prisma } from 'src/generated/prisma';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('tickets') private readonly ticketsQueue: Queue,
  ) {}

  async enqueueTicket(ticketId: string) {
    console.log(`Enqueueing ticket ${ticketId}...`);
    await Promise.all([
      this.ticketsQueue.add(
        'ticket-notify',
        { ticketId },
        {
          jobId: `notify_${ticketId}`,
          attempts: 3,
          backoff: { type: 'exponential', delay: 3000 },
        },
      ),
      this.ticketsQueue.add(
        'ticket-sla',
        { ticketId },
        {
          jobId: `sla_${ticketId}`, // [ExceptionsHandler] Error: Custom Id cannot contain :
          delay: 15 * 60 * 1000, // 15 minutes
        },
      ),
    ]);
    console.log(`Enqueued ticket ${ticketId}`);
  }

  async removeSlaQueue(ticketId: string) {
    console.log(`Removing SLA ${ticketId} queue...`);
    await this.ticketsQueue.removeJobScheduler(`sla_${ticketId}`);
    console.log(`Removed SLA ${ticketId} queue`);
  }

  async create(createTicketDto: CreateTicketDto) {
    const ticket = await this.prisma.ticket.create({ data: createTicketDto });
    await this.enqueueTicket(ticket.id);
    return ticket;
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

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
    if (ticket.status === 'RESOLVED') {
      await this.removeSlaQueue(id);
    }
    return ticket;
  }

  remove(id: string) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
