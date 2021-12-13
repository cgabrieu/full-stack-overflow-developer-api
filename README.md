## Full Stack OverFlow Developer API 📚

<div align="center">
  <a href="https://fsoverflow.herokuapp.com/questions/1">
    <img src="https://user-images.githubusercontent.com/25062334/144647668-cf0d316d-afc8-48fe-b230-62f9d44d7dfe.png" width="300px">
  </a>
    <br />
    <a href="https://fsoverflow.herokuapp.com/questions/1">View the deploy</a>
    <br />
</div>
  
<br/>

## About

In this API people can post and answer questions. You can register, view the answered and unanswered questions, send an answer and access a ranking with the users who have the most answer points.
    
<br/>

## Technologies

Tools that were used in the project:
<p>
  <img src='https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript'>
  <img src='https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs'>
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express'>
  <img src='https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql'>
  <img src='https://img.shields.io/badge/eslint-000000?style=for-the-badge&logo=eslint&logoColor=472fb9'>
  <img src='https://img.shields.io/badge/npm-000000?style=for-the-badge&logo=npm'>
  <img src='https://img.shields.io/badge/Heroku-000000?style=for-the-badge&logo=heroku&logoColor=410093'>
</p>

<br/>

## How It Works

See sample requests and responses

- See all unanswered questions [here](https://fsoverflow.herokuapp.com/questions) (GET /questions)

- See the answers to a specific question [here](https://fsoverflow.herokuapp.com/questions/1) (GET /questions/QUESTION_ID), when not answered [here](https://fsoverflow.herokuapp.com/questions/3)

- See the ranking by points [here](https://fsoverflow.herokuapp.com/ranking)

- To answer a question you need to create a user to get your authorization token:
#### Make a POST /users:
```json
{
  "name": "Marcio",
  "class": "T3" 
}
```
It will return a json web token:
```json
{
  "token": "xxxxx.yyyyy.zzzzz"
}
```

<br/>

- If you create a question with an uncreated user, it will also return an authentication token:
#### Make a POST /questions:
```json
{
  "question": "Quando se deve usar 'var' no JavaScript?",
  "student": "João Pedro",
  "class": "T2",
  "tags": "javascript, var"
}
```
It will return the question id and user authentication token:
```json
{
  "questionId": 2,
  "userToken": "xxxxx.yyyyy.zzzzz"
}
```

<br/>

- To answer a question:
#### Make a POST /questions:QUESTION_ID :
```json
{
  "answer": "É um mecanismo de controle de fluxo que visa beneficiar processos assíncronos." 
}
```
It will return status code 200 created. Make sure you're sending a header in the format:
```
  BEARER xxxxx.yyyyy.zzzzz
```

- To up vote a question (increase one point), make a PUT /questions/QUESTION_ID/up-vote

- To down vote a question (decrease one point), make a PUT /questions/QUESTION_ID/down-vote

<br/>

## Getting Started

To run locally follow the steps

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create the root folder named full-stack-overflow-developer and access it
```sh
mkdir full-stack-overflow-developer && cd full-stack-overflow-developer
```
2. Clone the repo
```sh
git clone https://github.com/cgabrieu/full-stack-overflow-developer-api.git
```
3. Install dependencies with npm
```sh
npm install
```
4. Create a database using the command below via postgres
```sh
CREATE DATABASE fullstackoverflow;
```
5. Automatically create all necessary tables to backend repo with <a href="https://github.com/cgabrieu/full-stack-overflow-developer-api/blob/main/dump.sql">dump</a>. 

8. Connect your backend to the database, for that, rename the .env.example to .env.dev and fill in your data.

### How to run

1. Run using the command (remember to be on the repo): 
```sh
npm run start:dev
```

## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`


<br/>

## Developer

* [Carlos Gabriel](https://github.com/cgabrieu)

