# My TODO List App - Backend

[![CI](https://github.com/lrasata/todo-list-app/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/lrasata/todo-list-app/actions/workflows/backend-ci.yml)

## Prerequisites
Provide in the `.env` the following variables:

```
MONGO_URI=
JWT_SECRET=
ALLOWED_ORIGIN=
DOMAIN=
NODE_ENV=
```

| Variable         | Description                                                                                                                       |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `MONGO_URI`      | The remote MongoDB URI                                                                                                            |
| `JWT_SECRET`     | JWT secret for JWT generation                                                                                                     |
| `ALLOWED_ORIGIN` | Origin allowed to perform API request. Ex : http://localhost:5173                                                                 |
| `NODE_ENV`       | `development` or `production`                                                                                                     |
| `DOMAIN`         | when `NODE_ENV=production`, specifying the domain of the client allow the backend to set the cookie. Ex: `DOMAIN=todolistapi.com` |


## Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Move to frontend folder:
`cd ./backend`

Installation:

`npm install`


To Start Server:

`npm start`

Server is running on PORT:

`http://localhost:8080/`

---

## Docker

### Using Docker Compose

```bash
docker-compose up --build
```

This will build and start services in `docker-compose.yml`. In this file, the web app is set up to be accessible on port `8080` : `http://localhost:8080/`

Make sure Docker is installed and running on your system.
