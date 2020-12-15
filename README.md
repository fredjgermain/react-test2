# Project title: React-crud-mongoose-demo

## Summary: 
This project is a demo of an admin section with CRUD (Create, Read, Update, Delete) functionalities to read/edit a set of mongoDb collections. The user may select a collection he wish to edit. The selected collection's datas are displayed in a table format allowing inline update, creation and deletion. The whole project is seperated into 2 parts; the front-end (LINK ...), and back-end (LINK ...). 

## Objectives:
- Learn to use Typescript, mongoose and react. 
- Learn to write custom react components and hooks with a good reusability and simplicity of use. 
- The front-end is meant to adapt at runtime to most mongoose schema / business model. 
- The back-end serves as a bridge between the react front-end and a MongoDb set. 

## Front-End Description (LINK ...) 
The Front-End part is written in Typescript and React functional components. The front-end uses reusable custom components and hooks. These components and hooks adapt at runtime to most mongoose schema and allow to create, read, update or delete any items from a selected collection. 

Examples: 
  updating or creating a field of type string will display an < input type="text" > 
  updating or creating a field of type number will display an < input type="number" > 
  updating or creating a field of type with an enum will display a drop down list of enum values rather than a < input ... > 
  updating or creating a field of type objectid will display a drop down list of foreign values to select from. 
This behavior adapts at runtime the display of datas according to their respective types. 

### Depedancies
- npm install -g create-react-app 
The option "-g" seems necessary 

- create-react-app < my-app > 
The Use of 'create-react-app' may seems identical to 'npx create-react-app', but my not work the same on deployment to heroku. 
Push on git, then deploy on heroku. 
This ought to create a template for the front-end project, ready without configuration to deployment and running on Heroku. 

[For complete instructions](https://blog.heroku.com/deploying-react-with-zero-configuration).

#### Axios and Typescript dependancies. 
  axios
  @types/node
  @types/react
  @types/axios
  @types/react-dom


## Back-end part (LINK ...) 
The back-end part is written in Typescript and uses Mongoose and an Express server. It allows CORS (CROSS-origin ressource sharing) for the front-end part. A mock data set is used for development and demo purposes, but is meant as "bridge" between the front-end part and a MongoDb data set. 

### Depedancies
  @types/express 
  @types/node 
  express 
  nodemon 
  ts-node 
  typescript

  * npm i @types/express @types/node express nodemon ts-node typescript


## Reference
For complete instructions on how to [create react app ready for heroku deployment](https://blog.heroku.com/deploying-react-with-zero-configuration).
Following these instruction will generate an README file such as "createreactappreadme.md". 

For complete instructions on how to [create a typescript-express server ready for heroku deployment](https://dev.to/hte305/simple-deploy-typescript-application-to-heroku-5b6g)


## Contact
Frédéric Jean-Germain
fredjgermain@gmail.com