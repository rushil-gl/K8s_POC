#!/bin/bash

export RELEASE="release"
export HOTFIX="hotfix"

export PROD="PROD"
export STAGE="STAGE"
export DEV="DEV"
export NONE="NONE"
export AWS_REGION=us-east-1

if [ -f "lerna.json" ]; then
  echo "Getting version from lerna.json"
  export VERSION=$(cat lerna.json | jq -r .version)
elif [ -f "package.json" ]; then
  echo "Getting version from pacakge.json"
  export VERSION=$(cat package.json | jq -r .version)
else
  echo "Failed to determine version"
  exit 1
fi

export PROJECT=$(cat package.json | jq -r .name | cut -d'/' -f2)
export PACKAGES=$(ls -1 packages)
export DOCKER_REGISTRY=491070403555.dkr.ecr.us-east-1.amazonaws.com

export ENVIRONMENT=$NONE

if [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+-rc\.[0-9]+ ]]; then
  export ENVIRONMENT=$STAGE
fi

if [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+-alpha\.[0-9]+ ]]; then
  export ENVIRONMENT=$DEV
fi

if [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  export ENVIRONMENT=$PROD
fi

if [ "$ENVIRONMENT" == "$NONE" ]; then
  echo "Failed to determine environment based on version $VERSION"
  exit 1
fi

echo "===================================="
echo "PROJECT: $PROJECT"
echo "VERSION: $VERSION"
echo "ENVIRONMENT: $ENVIRONMENT"
echo "===================================="
