# My TODO List App - MERN stack application

> Please note that this **Project is under construction**

This project is a full-stack application built with `MongoDB, Express, React and Node.js`.
The purpose of this project is to serve as a training to get familiar with those technologies.

## Features
### User can Log in
<img src="./docs/login.png" alt="signup" height="300"><img src="./docs/mobile-login.png" alt="mobile-signup" height="300">

### User can only view and update their own tasks
<img src="./docs/todolist.png" alt="todolist" height="300"><img src="./docs/mobile-todolist.png" alt="mobile-todolist" height="300">

### User can create new tasks
<img src="./docs/create-task.png" alt="create-task" height="300"><img src="./docs/mobile-create-task.png" alt="mobile-create-task" height="300">

### User can create a new category of task
<img src="./docs/create-category.png" alt="create-category" height="300"><img src="./docs/mobile-create-category.png" alt="mobile-create-category" height="300">

### User view all tasks and filter results
<img src="./docs/all-tasks.png" alt="all-tasks" height="300"><img src="./docs/mobile-all-tasks.png" alt="mobile-all-tasks" height="300">

### User can fully manage task categories
<img src="./docs/all-categories.png" alt="all-categories" height="300"><img src="./docs/mobile-all-categories.png" alt="mobile-all-categories" height="300">


### Ongoing improvements
- [ ] Add unit test and e2e testing - In progress
- [ ] Issue : cannot remove the category of a task on update
- [x] ~~Issue :  on 1st load after login, the overdue tasks are not appearing~~
- [ ] Fix slight flickering on All tasks page --> use createApi() from RTK query to optimise number of calls


## Backend

### Prerequisites
Provide in the `.env` the MongoDB uri and a JWT secret for JWT generation

```
MONGO_URI=
JWT_SECRET=
ALLOWED_ORIGIN=
DOMAIN=
NODE_ENV=
```

- For `ALLOWED_ORIGIN` specify the frontend url, example : `ALLOWED_ORIGIN=http://localhost:5173`
- For `DOMAIN` (optional), use this in deployed env, specify the domain example : `DOMAIN=mywebsite.com`
- For `NODE_ENV`, specify value `development` or `production`

### Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Move to frontend folder:
`cd ./backend`

Installation:

`npm install`


To Start Server:

`npm start`

Server is running on PORT:

`http://localhost:8080/`

## Frontend

### Prerequisites
Provide in the `.env` the backend url.

```
VITE_BACKEND_API_URL=http://localhost:8080
VITE_DOMAIN=
VITE_NODE_ENV=
```

- For `VITE_BACKEND_API_URL` specify the backend url.
- For `VITE_DOMAIN` (optional), use this in deployed env, specify the domain example : `VITE_DOMAIN=mywebsite.com`
- For `VITE_NODE_ENV` (optional), specify value `development` or `production`

### Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Move to frontend folder:
`cd ./frontend`

Installation:

`npm install`


To Start Server:

`npm run dev`

To Visit App:

`http://localhost:5173/`

### Acknowledgement
This project took strong inspiration from the following resources :
- https://www.freecodecamp.org/news/how-to-build-a-mern-stack-to-do-app/
- https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
- https://medium.com/@neelriteshyadav/setting-up-protected-routes-in-a-mern-stack-application-a51c37a53762