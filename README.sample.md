# NestJS Template for GreatMinds Habitat

The purpose of this repository is to provide a template for all the micro-apps to be developed within Great Minds Digital Platform

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Start by cloning this project on your workstation.

```sh
$ git clone https://github.com/greatmindsorg/dp-nestjs-template.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./dp-nestjs-template
npm install
```

## Running the app

```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Execute to http&#x3A;//localhost:3000 in your browser

## Running the tests

Running unit test and calculating code coverage

```sh
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Break down into end to end tests

Running end to end tests

```sh
# e2e tests
$ npm run test:e2e
```

### And coding style tests

Linter is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs

```sh
# code style
$ npm lint
```

## Deployment

We are using a jenkins pipeline that takes care of the deployment. Remember to
ask for assistance from a DevOps for setting up the pipeline when creating
a new project.

## Versioning

This project uses the `dp-versioning-lib` tool for package versioning, it follows the
[Versioning Strategy](https://github.com/greatmindsorg/dp-versioning-lib/blob/develop/docs/versioning.md).

Make sure you follow the guidelines when...,

-   Creating a new git repository develop branch.
-   Creating a new release branch
-   Creating a new hotfix branch
-   Releasing a new production version

See [Versioning Examples](https://github.com/greatmindsorg/dp-versioning-lib/blob/develop/docs/examples.md)

For the production versions available, see the [tags on this repository](https://github.com/greatmindsorg/dp-nestjs-template/tags).
For all versions, including alpha or release candidate packages, see [npm registry server](https://nexus.greatminds.dev/#browse/browse:npm-private)

## API Documentation

Check this page for more details. [API documentation](src/docs/README.md)

## Authors

-   *Javier Perez*
-   *Alejandro Naso*
-   *Gabriel Dominguez*

See also the list of [contributors](https://github.com/greatmindsorg/dp-nestjs-template/contributors) who participated in this project.

## License

GreatMinds - All rights reserved
