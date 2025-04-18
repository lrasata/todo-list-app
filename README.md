# My TODO List App - MERN stack application 

> Please note that this **Project is under construction** 

This project is a full-stack application built with `MongoDB, Express, React and Node.js`. 
The purpose of this project is to serve as a training to get familiar with those technologies.

## Features
### Users can Sign Up or Log in
<img src="./docs/signup.png" alt="signup" height="350"><img src="./docs/mobile-signup.png" alt="mobile-signup" height="350">

### Users can only view and modify their own tasks
<img src="./docs/todolist.png" alt="todolist" height="350"><img src="./docs/mobile-todolist.png" alt="mobile-todolist" height="350">

<img src="./docs/all-tasks.png" alt="all-tasks" height="350"><img src="./docs/mobile-all-tasks.png" alt="mobile-all-tasks" height="350">


### Ongoing improvements
- [ ] issue : Update task when marking to be completed is not working
- [ ] issue : All tasks page filter : partial text search is not working
- [ ] issue : All tasks page filter : non saved filters should be re-initialised after text search or date filter is performed
- [ ] Category management (when updating a category on DocumentDB the change should propagate) + replace Navigation with AppBar to be able to add more menu item
- [ ] Fix slight flickering on All tasks page --> use createApi() from RTK query to optimise number of calls
- [ ] Add unit test and e2e testing

## Backend

### Prerequisites
Provide in the `.env` the MongoDB uri and a JWT secret for JWT generation

```
MONGO_URI=
JWT_SECRET=
```

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
```

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
