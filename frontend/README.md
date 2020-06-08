# Twitter project
Using TypeScript to build a client and api to that displays Twitter data

### Planning the Project
- Setup initial project with create-react-app and Serverless framework
- Setup redux on the front end
- Build presentational components using mock data
- expose API endpoints with data to be consumed by front end
- write tests

### Things to improve
- When a user has no tweets we need to ahndle this error and display a nice message to the user
- API has no Authorization, for this i would use a custome Lambda authorizer
- UI styling is barebones need improvement
- add the loading library to track the error / loading state
- If you click the search button twice the state doesnt change so it needs to update
- add the correct headers to the response
- add the logging library