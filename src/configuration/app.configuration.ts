import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '@greatminds/dp-configuration-lib';
import { Configurable } from '@greatminds/dp-nestjs-configuration-lib';
/**
 * It encapsulates the application configuration properties.
 * Properties related to the application initialization.
 *
 * @author javier.perez
 */
@Injectable()
export class AppConfiguration {
  constructor(
    @Configurable() private readonly configuration: ConfigurationService,
  ) {}

  get port(): number {
    return this.configuration.get('port', 3000);
  }
}
