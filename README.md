# express-auth

This is a reusable JWT authentication service built using NodeJS + Express. It runs over Docker using a MongoDB container as database.

## Usage

Users can signup using the `/auth/signup` endpoint and login using `/auth/login`. On successful signups and logins the generated JWT is returned in the response as a Cookie. 

## Environment

This app needs a .env file in it's root with the following format:

```
JWT_SECRET=<secret>
MONGO_AUTH_IP=<docker service name or mongo database IP>
MONGO_AUTH_PORT=<port number>
MONGO_AUTH_USER=<username>
MONGO_AUTH_PASS=<password>
MONGO_AUTH_DB=<db name>
```

## Development

```
docker-compose up -d --build
```

App runs on port 3001.

## Production

This is not a production ready auth service and needs some adjusments in order to become one. Those are being implemented at small paces.