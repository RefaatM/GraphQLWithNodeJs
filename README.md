# GraphQLWithNodeJs
# Introduction 
In this sample, I am exploring building an API with Node.js and GraphQL. For a long time, I have been building APIs in SOAP and REST usually with either in code like C#/ASP.Net, Java/ Spring or ESB platforms like BizTalk and MuleSoft (AnyPoint Platform).  Node.js has been gaining a lot of popularity with many successful products on the market. To get a feel of how it is to develop an API with JavaScript/Node.Js platform, I developed this sample survey GraphQL API. 
# Why GraphQL (https://graphql.org) ?
GraphQL is a query language for APIs and a runtime for fulfilling those queries it provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.  With GraphQL you can add new fields and types to the API without impacting existing clients. Aging fields can be deprecated and hidden from tools. By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage cleaner, more maintainable server code. 

# Why Node.js (https://nodejs.dev) ?
Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser. Node.js is an open-source and cross-platform JavaScript runtime environment.  Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant. A Node.js app is run in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking.
Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code in addition to the client-side code without the need to learn a completely different language.

# The Sample Code
The code represents an API for a simplified survey application. The Survey Object has Id, Title and description fields. Each survey can have multiple questions. Each question has an Id, question text and question type. The question type can be either open text or a range. The data store for the sample is a MYSql database.  The code utilizes https://Sequelize.org and https://apollographql.com projects to implement the API. The source code is structured into the following folders:
config: contains the code for creating the database schema
Src/db: contains code for the database schema and functionality
sec/graphql: contains the code for the GraphQL server and GraphQL schema initialization
src/graphql/survey: contains the code for defining and implementing the API. 
scr/test: contains a sample Unit test code. 

# Downloading and Running the Sample 
Download the code from the GitHub Repo at https://github.com/RefaatM/GraphQLWithNodeJs 
1.	Create the DB by running the following command:
CREATE DATABASE  mr_invoices  CHARACTER SET  utf8mb4 COLLATE  utf8mb4_unicode_ci;
2.	Update the DB_PASS to your DB_user root in the .env file. 
3.	Run npm install to install all the dependences 
4.	Run the db migrations: npm run db:migrate to create the tables for Survey and Survey Questions in the DB
5.	Run: npm start. The GraphQL is available at http://localhost:3000/graphql
6.	In the qraphql playground you can 
a.	Add a survey with questions
mutation {
  addSurvey(title: " COVID-19 Response Survey", 
  description: "Collecting information about COVID-19 Response", 
  questions:[ 
    {question:"Can you provide feedbacks to this code challenge?", questionType: OpenText},
    { question:" How would you rate Canada reaction to Covid-19?", questionType: Range, rangeFrom: 1, rangeTo: 5},
  { question:" How would you rate USA reaction to Covid-19?", questionType: Range, rangeFrom: 1, rangeTo: 5}]
  ){ id, title, description, questions{id,surveyId,question,questionType} }
}
b.	Add survey without questions. 
mutation {
addSurvey(title: " COVID-19 Response Survey", 
description: "Collecting information about COVID-19 Response"){ id, title, description}
}

c.	Update survey with or without some questions 
mutation {
  updateSurvey(id:23, title: "World wide COVID-19 Response Survey", 
    questions:[{id:23, question:"How would you rate Canada response to COVI-19?", questionType: Range, rangeTo:10}])
{id,title,description, questions{id,surveyId,question,questionType}  }
}

d.	Add a question to an existing survey 
mutation{
  addQuestion(surveyId: 23, question:"How would you rate the UK response to COVID-19", questionType: Range, rangeFrom: 1, rangeTo: 5)
     {id,surveyId,question,questionType,rangeFrom,rangeTo}
}
e.	Update a question 
mutation{
  updateQuestion(id:23, surveyId:23, question:"How would you rate the USA response to COVID-19?", questionType: Range, rangeFrom: 1, rangeTo: 10)
     {id,surveyId,question,questionType,rangeFrom,rangeTo}
}
f.	Query for a survey by id
query{
survey(id:6){id, title,description,questions{id,surveyId,question,questionType}}
}
g.	Query for a survey by criteria
query{
surveys(search:{title:"COVID-19 Resposne Survey"}){id, title,description,questions{id,surveyId,question,questionType}}
}
h.	Query for questions by criteria
query{
 questions(search:{surveyId: 23}){ id,surveyId,question,questionType}
}
# Closing 
GraphQL is the way that any new model API should be built. Forget about REST RAML or OpenAPI/Swagger.  I used to say modern APIs should be built in REST not SOAP. But GraphQL takes API design and delivery to new levels of robustness and reusability. No longer do you need to have URLs with v1.0 v2.0 etc. One URL would support the new and old queries. Yes, with GraphQL you will still have to monitor any queries or mutations that you deprecate usage till you can remove them completely. Though, it is easier to keep the new queries and operations backward compatible. 
Node.js: Very impressive. I was able within a few hours to create a fully functioning API with MYSql DB as a Data Store. JavaScript in JIT compiled now, and hardware is way faster so performance should not be an issue. Though I struggle with the fact that it is not strongly typed code. 
Now the question would be would I drop C#/ASP.Net, Java/Spring Boot for Node.Js as the implementation platform for new API’s? my gut feeling is no. As I have strong background in C# and Java not sure I will prefer to build the back-end server in JavaScript. Though I might be wrong. I will build the same sample in both C#/ASP.net and Java/Spring Boot and make a comparison. 
Let me know which environment you prefer to develop an API and why?
