# express-auth

This is a reusable JWT authentication service built using Node + Express and TypeScript. It runs over Docker using MongoDB as a database.

## Usage

Users can signup using the `/auth/signup` endpoint and login using `/auth/login`. On successful signups and logins the generated JWT is returned in the response as a Cookie. There is also a postman collection as example.

## Environment

This app needs a .env file in it's root with the following format:

```
CORS_ORIGIN=<origin address>
JWT_SECRET=<secret>
MONGO_URI=<mongo app uri>
MONGO_TEST_URI=<mongo test uri>
MONGO_AUTH_USER=<username>
MONGO_AUTH_PASS=<password>
```

## Quickstart

```
docker-compose up -d --build
docker exec -it auth_container npm run test
```

App runs on port 3001.

## Production

This is not a production ready auth service and needs some adjustments in order to become one. Those are being implemented at small paces.
