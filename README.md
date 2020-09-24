# Worktango Backend challenge

Thank you for taking the time to complete our code challenge. We appreciate and respect your time and for this reason we don't want you to spend more than 3 hours.

That's why we provided you with simple boilerplate project with a project using the following stack:

- [Nodejs](https://nodejs.org/en/) - Javascript Runtime built on  [Chrome's V8 JavaScript engine](https://v8.dev/)
- [Sequelize](http://docs.sequelizejs.com/) - ORM for Nodejs
- [Express](http://expressjs.com/) - NodeJS HTTP server API framework
- [GraphQL](https://graphql.org/) - A query language for Apis and a runtime for executing queries.
- [GraphQLJS](https://github.com/graphql/graphql-js) - An implementation of GraphQL for Javascript
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Framework to implement a GraphQL Server.

## The Survey Creation Challenge

Create CRUD GraphQL queries and mutations to create Surveys, as the following:
  1. Create a GraphQL mutation responsible to create a Survey. Surveys have title, description, questions of 2 types (rating, that could vary from 1 to 10 rating AND open text questions).
  2. Create a GraphQL query to get all surveys.
  3. Create a GraphQL query to edit a survey.

Question rating types can vary according to the user creating the survey.
   - Example: Survey X has 3 questions.
      - One open text questions and 2 rating questions.
      - The open text is "Can you provide feedbacks to this code challenge?"
      - The first rating question is "How would you rate Canada reaction to Covid-19?" and have ratings from 1 to 5.
      - The second rating question is "How would you rate USA reaction to Covid-19?" and have ratings from 1 to 10,

As you can see, this is an open ended challenge with just a few requirements that's open to interpretation, so you can focus on the basic requirements and anything else you find important. But remember to not spend more than 3 hours.

### Prior to run the project

- create a `.env` file Copying the content of the file `development.env`, like this(mac and ubuntu): `$ cat development.env >> .env` .
- Download [Nodejs](https://nodejs.org/en/download/) Latest LTS Version (as of today, version 12.17.0)
- Download [MySQL](https://dev.mysql.com/downloads/installer/)
- Download a MySQL Client(or run through mysql cli on terminal if you prefer): There are a lot of options but the most popular one is [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) though I'm using [Sequel Pro](https://sequelpro.com/download)
- to create the database, run this query inside the client:
  - `CREATE DATABASE wt_challenge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
- to create all tables, run on a terminal: `$ npm run migrate-db`

- PS: If, for some development reason, you need to recreate the database you can use"
  - `DROP DATABASE wt_challenge; CREATE DATABASE wt_challenge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

### Running the Project
1. Install all dependencies of the project: `npm install`
2. Run the db migrations: `npm run db:migrate`
3. Run the project: `npm start`
- graphl playground in path `/graphql` so if localhost and port 3000 (port configurable through the PORT enviroment variable on the `.env` file) you'd go to `localhost:3000/graphql`

### Graphql Playground

If you npm start the api and go to `localhost:3000/graphql` you should see the Graphql Playground where you can start querying the api right away. Here are some examples of the existing queries on this project:

```graphql
# create user
mutation addUser  {
  addUser (
    email: "challenge+2@worktango.com"
    password: "Ch4llenge"
    firstName: "Super Skilled"
    lastName: "Developer"
  ) {
    email
    firstName
    lastName

  }
}

# get user by id
query getOneUser {
  user (id: 1) {
    email
    firstName
    lastName
  }
}

# get all users
query getAllUsers {
  users {
    email
    firstName
    lastName
  }
}

# get users using filters
query getUsersWithFilter {
  users(search: {firstName: "Super Skilled"}  ) {
    email
    firstName
    lastName
  }
}
```
