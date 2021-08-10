#!/bin/bash

set -e

source ./.github/env.sh

bucket="dp-test-reports"
s3_base_key="$PROJECT/$BRANCH"

function publish() {
  local report=$1

  echo "Publishing report $report"
  if [ -d $report ]; then
    aws s3 cp \
      --region us-east-1 \
      --quiet \
      --recursive \
      $report \
      s3://$bucket/$s3_base_key/$report
  else
    aws s3 cp \
      --region us-east-1 \
      --quiet \
      $report \
      s3://$bucket/$s3_base_key/$report
  fi
  echo "https://$bucket.s3.amazonaws.com/$s3_base_key/$report"
}

if [ -f "lerna.json" ]; then
  for report in "test-report.html" "coverage/lcov-report"; do
    for package in $PACKAGES; do
      if [ -e "packages/$package/$report" ]; then
        publish packages/$package/$report
      else
        echo "Report packages/$package/$report not found"
      fi
    done
  done
else
  for report in "test-report.html" "coverage/lcov-report"; do
    if [ -f $report ]; then
      publish $report
    else
      echo "Report $report not found"
    fi
  done
fi
