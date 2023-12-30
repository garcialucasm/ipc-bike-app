
# Running the project locally 
IPC-Bikes can be easiliy run with docker containers available on directory `docker`
in the root project. Dockerfiles are segregated by environment. We have  two 
available environments: test and staging. Test is for running the unit, integration
and API tests. Staging is for running the application in a pre-production 
stage. 

For running functional tests use the following command on project 
root directory

```bash
# if there's any previous test container, you should clean up volumes to ensure
# tests execute in a clean environment
docker compose -f docker/test/docker-compose.yml --project-directory=. down -v

# build the testing container
docker compose -f docker/test/docker-compose.yml --project-directory=. build 

# run the test container
docker compose -f docker/test/docker-compose.yml --project-directory=. up
```

For running staging we use the same command but pointing for staging files:

```bash
docker compose -f docker/staging/docker-compose.yml --project-directory=. build
docker compose -f docker/staging/docker-compose.yml --project-directory=. up
```
Removing previous docker volumes for staging environment is not mandatory, but 
keep in mind that data from previous execution will be present on database one 
you restart your docker compose. 
