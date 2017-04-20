# web

[![Codefresh build status]( https://g.codefresh.io/api/badges/build?repoOwner=nudj&repoName=web&branch=master&pipelineName=master&accountName=collingo&key=eyJhbGciOiJIUzI1NiJ9.NThhZDVhYzdhOGU4YWUwMTAwMzQ4MTcz.LswrznCGW0BHHD1jCDCg-EWQm_-4_j0qwWCvUTZcCYA&type=cf-1)]( https://g.codefresh.io/repositories/nudj/web/builds?filter=trigger:build;branch:master;service:58af1fc2a6eaef01000f1bd6~master)

Nudj website

## Contributing

### Dependencies

1. Docker
1. Make

### Development

1. `make build` to build the app image
  1. `make run` to run the app
1. `make buildDev` to build the development image
  1. `make dev` to run the app with file watchers
  1. `make test` to run the tests one time
  1. `make tdd` to run the tdd watcher
