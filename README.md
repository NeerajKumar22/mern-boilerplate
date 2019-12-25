# mern-boilerplate
A simple boilerplate for creating full stack application in javascript using react for client side and node/express as backend for creating APIs. 

## Quick Start

  The quickest way to get started with this boilerplate is to fork it into your own repo.
  Get into the root of the application

```bash
cd mern-boilerplate/
```

  Install dependencies:

```bash
$ npm install
```

  Start the server:

```bash
$ npm start
```

  View the website at: http://localhost:3000

## Folder structure
- bin
  - www file is the server start script 
- *client*
    - src
      - components
        - Hello.js
      - App.js
    - index.js
      - entry point for react application
- *server*
    - controller
        - userController.js
    - models
        - User.js
            - for defining the schema files
    - public
        - stylesheet
          - contains static assets in express

    - routes
        - route handler for node application

    - views
        - for express templates

  - .babelrc
      - transpiler for react and ES6 codes

- .gitignore
    - ignore node_modules and bundles
  
- app.js
    - entry point for express application

- package.json
    - project metadata and dependencies list

- webpack.config.js
    - bundler for react application
