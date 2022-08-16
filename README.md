# Storefront Backend Project

## Setting-up

- First you'll need to install all modules with `npm install`.
- Set up the docker container with the postgres image for the database with `docker-compose up`. There's also an adminer image on the container to check the database in the browser on port 8080.
- `npm run reset_db` will reset the database and run the up migration.
- `npm run build`: will compile the Typescript source files.
- `npm run start`: will start the server with node.

The backend runs on port 3333 and the database on the standard 5432 port. Details of the API endpoints required and the database structure are on the `REQUIREMENTS.md` file.

## Connecting to the database

As mentioned, the docker container includes adminer. You can connect to it on the port 8080, using the environment variables (you can check database.json if available).

## Other Scripts available
- `npm run lint`: Running eslint.
- `npm run prettier`: Formatting.
- `npm run test`: Compiling and running Jasmine's tests.
- `npm run watch`: Starting the server with tsc-watch.
