# Feijoada Seven
> Testing microfront

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

## Preparation

Run `yarn` to install all dependencies here and on each server folder

## Usage

Run each server, mind to read each folder `README.md` that gives what PORT to run before `yarn start`

## Structure

* **appshell** - It's the main application that will call other ones. Made with React + SSR based on Razzle.
* **react** - A server made with React + SSR based on Razzle and outputs only the content depending on headers sent
* **angularjs** - A server without SSR made with AngularJS
