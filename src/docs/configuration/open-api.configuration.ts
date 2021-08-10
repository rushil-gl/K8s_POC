import { dpEnvironment } from '@greatminds/dp-configuration-lib';
import { API_PREFIX, Environment } from '../../constants/api.constants';

export class OpenApiConfiguration {
  static getApiTitle(): string {
    return (
      process.env.API_TITLE || 'Great Minds Digital Platform - Template API'
    );
  }

  static getApiDescription(): string {
    return process.env.API_DESCRIPTION || 'API for Digital Platform Template';
  }

  static getPackageVersion(): string {
    return process.env.npm_package_version || '';
  }

  static getEnvironmentUrl(): string {
    const prefix = `${API_PREFIX}/`;
    switch (dpEnvironment()) {
      case Environment.local:
        return `http://localhost:${process.env.PORT || 3000}`;
      case Environment.prod:
        return `https://digital.greatminds.org/${prefix}`;
      default:
        return `https://digital.${dpEnvironment()}.greatminds.${dpEnvironment()}/${prefix}`;
    }
  }
}
