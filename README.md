# KevengHomeBackend

backend for personal online portfolio / online "shop"

## vison

To make a bakend to handle serving of "products" and other items

-   [ ] endpoint for serving items to frontend aplication

-   [ ] endpoints for modifying and adding data in the database

-   [ ] handeling of autenticaton to prevent unvanted modificaton of tabeles

## Technology

-   [Typescript](https://www.typescriptlang.org)

-   [Prisma](https://www.prisma.io)

-   [Prettier](https://prettier.io)

-   [Concurrently](https://github.com/open-cli-tools/concurrently#readme)

-   [Nodemon](https://nodemon.io)

### tools

-   [date-fns](https://date-fns.org)

## Scripts

-   `npm run build` // builds tsoa, routes and tsc
-   `npm start` // starts the local server on the port defined at env.PORT alternatively port 3000
-   `npm run format` // format all documents not spesefied in .prettierignore
-   `npm run format:check` // check for format errors in all documents not spesefied in .prettierignore

## Documentation

We are using Swagger for dokumentation of endpoints, this shuld be running on `/swagger`.This includes endopnts and response moddels
