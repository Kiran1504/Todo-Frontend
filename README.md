# [To-Do app Task](https://fire-ai-kiran-todo.netlify.app/) (click to open)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Key Features Implemented

1. This is an To-Do app.
2. You have to register yourself.
3. Then you can login, add todo's, mark them as complete, **you can even get notification of important task marked by you**, and you can logout.
4. The todo's are editable and stored in backend.
5. This Todo app is fully integrated with backend (includes original api calls and not mock api calls) and stores data in **_MongoDB_**.
6. I have successfully implemented Authentication of user by cookies using **JWT**.
7. Used react-redux to manage AuthStatus (is user logged in or not.) as global state.
8. The backend is also developed by me. **[Backend repository](https://github.com/Kiran1504/Todo-Backend)**
9. Routing is done using react-router-dom.
10. The client side form validation is performed using [Yup](https://www.npmjs.com/package/yup)
11. useEffect() and useState() are used for managing the states in application.

## How it works

- You register / login on the platform.
- Add you're daily tasks.
- You can mark them as important to get **notified** (currently you will get immediately notified in 2 secs but we can develop it further for overdue & pending tasks).
  1. The completed task will not be notified if marked completed before the duration.
  2. The deleted task before notify duration will not be notified.
- You can mark them as completed when you finish with the task.
- You can edit the task.
- You can delete the task.
- Logout functionality is also provided.
- Multiple accounts can be created on same device.

### You can use the project at https://fire-ai-kiran-todo.netlify.app/ here the project frontend is hosted.

## Instructions to Run the Project Locally:

1. Clone the repository.
2. Clone the backend repo (https://github.com/Kiran1504/Todo-Backend)
3. Remove `sameSite: 'none'` option in backend/src/controllers/userController.js (2 instances of it).
4. Change the https://fire-ai-todo-backend.onrender.com/ to http://localhost:5000/
5. Install all dependencies for both backend and frontend by running `npm install` or `npm i` in terminal.
6. Run the backend with script `npm run start`.
7. Run the frontend with the same script `npm run start`.

## Sample ENV file for backend

- `DB` = mongodb+srv://\<username>:\<password>@cluster0.iinq753.mongodb.net/\<dbname>

- `PORT` = 5000
- `CORS_ORIGIN` = http://localhost:3000
- `SECRET_KEY` = \<secret Key>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
