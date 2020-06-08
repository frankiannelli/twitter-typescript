# Twitter project
Using TypeScript to build a client and api to that displays Twitter data

## Running the project
- run `npm install` in both the api and frontend directories
- save the environment variables into `api/configuration/variables.yml`
- run  `npm start` in both directories
- frontend runs on `localhost:3000`
- api runs on `localhost:4000`

### Planning the Project
- Setup initial project with create-react-app and Serverless framework
- Setup redux on the front end
- Build presentational components using mock data
- expose API endpoints with data to be consumed by front end
- write tests

### Things to improve
- When a user has no tweets we need to handle this error and display a nice message to the user
- Use a custom Lambda authorizer to add Authorization to the API
- More tests needed on both the api and frontend
- UI styling is barebones need improvement
- Add more action types to handle the error / loading state
- If you click the search button twice the state doesn't change and so the page hangs on loading
