import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AdminService {
  constructor(@InjectQueue('tickets') private readonly ticketsQueue: Queue) {}

  async getQueueStats(queueName: string) {
    const queue = this.getQueueInstance(queueName);
    if (!queue) {
      throw new NotFoundException(`Queue ${queueName} not found`);
    }
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ]);
    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
    };
  }

  private getQueueInstance(name: string): Queue | null {
    switch (name) {
      case 'tickets':
        return this.ticketsQueue;
      default:
        return null;
    }
  }
}
