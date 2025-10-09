import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from 'src/prisma.service';
import { BullModule } from '@nestjs/bullmq';
import { TicketConsumer } from './tickets.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tickets',
    }),
  ],
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService, TicketConsumer],
})
export class TicketsModule {}
