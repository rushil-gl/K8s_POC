import { HealthCheckError } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';

/**
 * Checks the process memory heap usage.
 */
@Injectable()
export class HeapUsedIndicator extends HealthIndicator {
  /**
   * Checks the used heap versus the total available heap. Fails if
   * the percent is above the threshold.
   *
   * This is a check against the process and not the system memory
   * so takes into account the VM restrictions.
   *
   * @param key The key which will be used for the result object
   * @param percentMaxUsage a number from 0 to 100 indicating the max allowed heap usage (optional, default: 95)
   */
  public check(key: string, percentMaxUsage?: number) {
    const memStats = process.memoryUsage();
    const percentUsed = (memStats.heapUsed / memStats.heapTotal) * 100;
    const percentMax = percentMaxUsage || 95;

    const healthy = percentUsed < percentMax;
    const status = super.getStatus(key, healthy, {
      ...memStats,
      percentUsed,
      percentMax,
    });
    if (!healthy) {
      throw new HealthCheckError('used memory is above threshold', status);
    }
    return status;
  }
}
