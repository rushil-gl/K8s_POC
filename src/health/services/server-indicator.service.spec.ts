import { ServerIndicator } from './server-indicator.service';

describe('ServerIndicator', () => {
  describe('check', () => {
    it('should return status up', async () => {
      process.env.npm_package_version = 'x.x.x.x';
      const serverIndicator = new ServerIndicator();
      const returned = serverIndicator.check('server');

      expect(returned).toMatchObject({
        server: {
          status: 'up',
          version: expect.any(String),
          utc: expect.any(String),
          local: expect.any(String),
        },
      });
    });
  });
});
