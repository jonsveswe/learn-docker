To spin up app container, start docker engine, cd into the app folder and do:

development:

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

production:

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`

In our simple case, the difference between dev and prod is that in prod we don't install the dev dependency "nodemon" and we don't create any volumes, especially no bind mounts for auto syncing folders.