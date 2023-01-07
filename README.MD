# Veerii Backend

## Introduction

Node API written in Typescript

## Prerequisites

- Understand Typescript
- Mongoose and MVC concept
- Understand Middleware
- JWT tokens
- Knowledge of Yarn (we are not using NPM)

## How to run local

> Once cloned the project you will need to create a `.env` (in the root of the project) file which is where all the secrets are stored

1. run

```bash
#1. to install all dependencies:
$ yarn

#2. need to set up typescript to build on the dist folder:
$ yarn setup

#3. you should be able to run the project with:  
$ yarn start

# this will run tsc and nodemon at the same time so that it checks the TS upon save
```
