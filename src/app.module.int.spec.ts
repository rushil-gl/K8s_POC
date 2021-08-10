import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

describe('AppModule (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/health/readiness', () => {
    it('should return ok', () => {
      process.env.npm_package_version = 'x.x.x.x';
      return request(app.getHttpServer())
        .get('/health/readiness')
        .expect(200)
        .then(response => {
          const data = response.body;
          expect(data).toMatchObject({
            status: 'ok',
            info: {
              server: {
                status: 'up',
                version: expect.any(String),
                utc: expect.any(String),
                local: expect.any(String),
              },
            },
          });
        });
    });
  });
});
