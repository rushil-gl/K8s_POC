import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { SystemCPUIndicator } from '../services/cpu-indicator.service';
import { EventLoopIndicator } from '../services/event-loop-indicator.service';
import { HeapUsedIndicator } from '../services/heap-indicator.service';
import { ServerIndicator } from '../services/server-indicator.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private server: ServerIndicator,
    private cpu: SystemCPUIndicator,
    private eventLoop: EventLoopIndicator,
    private heap: HeapUsedIndicator,
  ) {}

  @Get('/readiness')
  @HealthCheck()
  @ApiOperation({ summary: 'Readiness check' })
  healthCheck() {
    return this.health.check([async () => this.server.check('server')]);
  }

  @Get('/liveness')
  @HealthCheck()
  @ApiOperation({ summary: 'Liveness check' })
  livenessCheck() {
    return this.health.check([
      async () => this.eventLoop.check('eventLoop'),
      async () => this.cpu.check('cpu'),
      async () => this.heap.check('memory'),
    ]);
  }
}
