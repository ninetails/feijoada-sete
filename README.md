# Feijoada Seven
> Testing microfront

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

## Structure

```
src
  appshell
```

## AppShell

It's the main application that will request the other ones and be responsible for having a shared application store.

### Usage

To run AppShell, `cd appshell` and run `yarn start`

## Server One

It's an another React Server with SSR (simpler than AppShell) that will render a page but gets some simpler output if certain headers were passed.

### Usage

To run Server One, `cd server-one` and run `yarn start`
