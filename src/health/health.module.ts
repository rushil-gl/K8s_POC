import { Module } from '@nestjs/common';
import { ServerIndicator } from './services/server-indicator.service';
import { HeapUsedIndicator } from './services/heap-indicator.service';
import { SystemCPUIndicator } from './services/cpu-indicator.service';
import { EventLoopIndicator } from './services/event-loop-indicator.service';
import { HealthController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  controllers: [HealthController],
  providers: [
    ServerIndicator,
    HeapUsedIndicator,
    SystemCPUIndicator,
    EventLoopIndicator,
  ],
  imports: [TerminusModule],
})
export class HealthModule {}
