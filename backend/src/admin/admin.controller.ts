import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/queues/:name/stats')
  @ApiParam({
    name: 'name',
    description: 'Queue name',
    example: 'tickets',
  })
  @ApiResponse({
    status: 200,
    description: 'Queue stats',
    schema: {
      example: {
        queueName: 'tickets',
        waiting: 3,
        active: 1,
        completed: 12,
        failed: 2,
        delayed: 0,
      },
    },
  })
  async getQueueStats(@Param('name') name: string) {
    return this.adminService.getQueueStats(name);
  }
}
