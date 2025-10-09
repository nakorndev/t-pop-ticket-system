import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('tickets')
export class TicketConsumer extends WorkerHost {
  constructor() {
    super();
    console.log('🎯 TicketConsumer initialized!');
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async process(job: Job<{ ticketId: string }>) {
    switch (job.name) {
      case 'ticket-notify':
        console.log(`🔔 Notify ticket ${job.data.ticketId}`);
        break;
      case 'ticket-sla':
        console.log(`⏰ Check SLA for ticket ${job.data.ticketId}`);
        break;
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`❌ Job ${job.id} failed:`, err.message);
  }
}
