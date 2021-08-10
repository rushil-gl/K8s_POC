import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import moment from 'moment';

/**
 * Checks if the server is running
 * and returns a result object corresponding to the result
 * @param key The key which will be used for the result object
 *
 * @example
 * assessmentServer.check('server')
 * Returns { server: { status: 'up', version: '#.#.#' } }
 */
@Injectable()
export class ServerIndicator extends HealthIndicator {
  public check(key: string) {
    const isHealthy = true;
    const version = process.env.npm_package_version;
    const result = super.getStatus(key, isHealthy, {
      version,
      utc: moment.utc().format(),
      local: moment().format(),
    });
    return result;
  }
}
