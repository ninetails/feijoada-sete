# Feijoada Seven
> Testing microfront

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

## Setup

Run `npm install` to install `eslint` configuration used by all subprojects

Run `npm run bootstrap` to install all dependencies for each subproject

## Usage

To serve, run `npm start` and main application will be served on `http://localhost:3000/`.

## Structure

**package/**
* **appshell** - It's the main application that will call other ones. Made with React + SSR based on Razzle.
* **react** - A server made with React + SSR based on Razzle and outputs only the content depending on headers sent
* **angularjs** - A server without SSR made with AngularJS
