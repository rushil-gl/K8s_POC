#!/bin/bash

set -e
source ./.github/env.sh

s3b=dev-dp-global-development-docs

mv "$SOURCE_DIR" "${SOURCE_DIR}-${ENVIRONMENT}"
SOURCE_DIR=${SOURCE_DIR}-${ENVIRONMENT}
SUBPATH=${SUBPATH}-${ENVIRONMENT}

printf "\nsynchronizing with S3 $s3b\n"
aws s3 sync \
--region $AWS_REGION \
--delete \
"$SOURCE_DIR" "s3://${s3b}/${PROJECT}/${SUBPATH}"

printf "\nURL *** https://dp-development-docs.k8s.dev.greatminds.dev/${PROJECT}/${SUBPATH}/api-docs.html has been published***\n"
printf "URL *** https://dp-development-docs.k8s.dev.greatminds.dev/${PROJECT}/${SUBPATH}/swagger.json has been published***\n"
