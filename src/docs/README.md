# API documentation

## Table of Contents
1. [Documentation module](#documentation-module)
2. [Documenting endpoints](#documenting-endpoints)
3. [Adding new endpoints to the documentation](#adding-new-endpoints-to-the-documentation)

##Documentation module
API documentation is made by the OpenAPI (Swagger) module for Nest. The template has already configured a
documentation module with the required configuration to generate a static HTML documentation with [Redoc](https://github.com/Redocly/redoc).

The documentation module is structured as below.
- **build**: Render the documentation based in the information gathered by Swagger plugin
- **docs.module**: Main module of the documentation process, contains all the controller to be added to the documentation.
- **configuration**: Contains configuration options for the documentation, such as: title, description. 
- **helpers**: Contains helpers method for documentation generation and dependencies mock

##Documenting endpoints
Endpoint documentation is made with the help of the decorators provided by the `@nestjs/swagger` module as shown [here](https://docs.nestjs.com/openapi/types-and-parameters).

Usually, an endpoint requires a big amount of decorators in order to cover all the posibles behaviours of that endpoint, like this:

```typescript
  @Get('/resource/:id')
  ApiOperation({
    description: 'Allows Get resources',
    summary: 'Get resource',
  })
  ApiQuery({
    name: 'version',
    description: 'Version',
  })
  ApiParam({
    name: 'id',
    description: 'Identifier',
  })
  ApiOkResponse({
    description: 'Get resource',
    type: GetResourceDto,
  })
  ApiUnauthorizedResponse({
    description: 'When the user or service is not authorized',
  })
  ApiNotFoundResponse({
    description: 'Resource not found',
    type: ResourceErrorException,
  })
  async find(@Query() version: String): Promise<GetResourceDto[]> {
    ...
  }
```

This could lead to code pollution, making hard to read if you are only interested in the code. You can solve this using
[Decorator composition](https://docs.nestjs.com/custom-decorators#decorator-composition) with the help of the 
`applyDecorators`, allowing you to create a single decorator that group all the documentation related to the endpoint:

```typescript
// apidocs.decorator.ts
export const GetApiDocs = () =>
  applyDecorators(
    ApiOperation({
      description: 'Allows Get resources',
      summary: 'Get resource',
    }),
    ApiQuery({
      name: 'version',
      description: 'Version',
    }),
    ApiParam({
      name: 'id',
      description: 'Identifier',
    }),
    ApiOkResponse({
      description: 'Get resource',
      type: GetResourceDto,
    }),
    ApiUnauthorizedResponse({
      description: 'When the user or service is not authorized',
    }),
    ApiNotFoundResponse({
      description: 'Resource not found',
      type: ResourceErrorException,
    }),
  );
```

Finally, the endpoint only need to apply the decorator created previously, The `applyDecorators` will apply all the 
documentation decorators provided.

```typescript
// resource.controller.ts
@Get('/resource/:id')
@GetApiDocs()
async find(@Query() version: String): Promise<GetResourceDto[]> {
  ...
}
```

##Adding new endpoints to the documentation
In order to add new endpoints to the documentation, you only need to add the controller in the documentation module like this:

```typescript
@Module({
  imports: [
    ConfigurationModule.forRoot({
      useEnvironmental: true,
    }),
    LoggerModule.forRoot(),
  ],
  providers: [
    ...autoMockProvider([
      'HealthCheckService',
      'ServerIndicator',
      'SystemCPUIndicator',
      'EventLoopIndicator',
      'HeapUsedIndicator',
    ]),
  ],
  controllers: [
    HealthController,
    ResourceController, // <-- New controller
  ],
})
export class DocsModule {
}
```

If your controller has a dependency like a service, you must provide it in the documentation module. For an easy mockup
you can use the `autoMockProvider`, this method only require the name of the dependency to provide:

```typescript
@Module({
  imports: [
    ConfigurationModule.forRoot({
      useEnvironmental: true,
    }),
    LoggerModule.forRoot(),
  ],
  providers: [
    ...autoMockProvider([
      'HealthCheckService',
      'ServerIndicator',
      'SystemCPUIndicator',
      'EventLoopIndicator',
      'HeapUsedIndicator',
      'ResourceService', // <-- Auto mocked dependency
    ]),
  ],
  controllers: [
    HealthController,
    ResourceController,
  ],
})
export class DocsModule {
}
```

This method is useful if the dependency is not used in the constructor, otherwise you must mock the dependency by yourself:

```typescript
@Module({
  imports: [
    ConfigurationModule.forRoot({
      useEnvironmental: true,
    }),
    LoggerModule.forRoot(),
  ],
  providers: [
    ...autoMockProvider([
      'HealthCheckService',
      'ServerIndicator',
      'SystemCPUIndicator',
      'EventLoopIndicator',
      'HeapUsedIndicator',
    ]),
    {
      provide: 'ResourceService', // <-- Manual mock
      useValue: {
        methodUsedByConstructor: () => null,
      },
    }
  ],
  controllers: [
    HealthController,
    ResourceController,
  ],
})
export class DocsModule {
}
```
