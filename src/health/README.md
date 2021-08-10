# Health Module

This module provides application health monitoring features.

Its default url is `/health/readiness` and it will return a json response indicating the application status based
on the configured server indicators, it also includes the application version from the package json.

It also contains `/health/liveness` and it will return a json response indicating the application status based
on the configured health indicators: cpu, heap, event-loop.

## Configuration

At this point this module has no configuration.
