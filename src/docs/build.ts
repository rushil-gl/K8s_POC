import { NestFactory } from '@nestjs/core';
import { OpenApiHelper } from './helpers/open-api.helper';
import { DocsModule } from './docs.module';
import { writeDocs } from './helpers/write-doc.helper';

async function buildDocs() {
  const app = await NestFactory.create(DocsModule);
  const swagger = OpenApiHelper.buildSwaggerJson(app);
  writeDocs(swagger);

  await app.close();
}

buildDocs();
