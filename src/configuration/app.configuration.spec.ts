import { AppConfiguration } from './app.configuration';
import { ConfigurationService } from '@greatminds/dp-configuration-lib';
import { mock } from '@greatminds/dp-testing-lib';

describe('AppConfiguration', () => {
  describe('port', () => {
    it('should return port from the configuration service', async () => {
      const configurationServiceMock = mock<ConfigurationService>({
        get: jest.fn().mockReturnValue(2000),
      });

      const applicationConfiguration = new AppConfiguration(
        configurationServiceMock,
      );

      expect(applicationConfiguration.port).toBe(2000);
      expect(configurationServiceMock.get).toHaveBeenCalledWith('port', 3000);
    });
  });
});
