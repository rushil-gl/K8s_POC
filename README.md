# NestJs Application Template

-   Rename README.md to TEMPLATE.md
-   Create a README.md that contains relevant information for your app, see `README.sample.md`
-   Modify package.json to contain the correct name of your app


        "name": "@greatminds/dp-nestjs-template",

-   Modify app.module.ts (secret manager) to contain the correct secret manager key


```
    ConfigurationModule.forRoot(
      {
        secretsManagerSecretIds: isProduction
          ? [`${dpEnvironment()}-dp-template`] // replace this with your application secret manager key
          : undefined,
        useEnvironmental: !isProduction,
      },
      loggerService,
    ),

```

-   Update the APP_PREFIX to point your app prefix if any. See `api.constants.ts`
