# React-crud-mongoose-demo

## Contact
Frédéric Jean-Germain
fredjgermain@gmail.com

## Summary: 
This project is a demo of a data entry section with CRUD functionalities (Create, Read, Update, Delete) allowing to read/edit a mongoDb data set. The user may select a collection to read or edit. The selected data collection is then displayed in a table format for readability and allowing inline update, creation and deletion of individual items. 

The whole project is seperated into 2 parts; the front-end (in this git repo), and back-end (LINK ...). 
This project is my first experience using React, MongoDb and Heroku and developping a complete project written in Typescript. 

## Objectives:
- A front-end which can adapt at runtime to most mongoose schema / business model. 
- A back-end serving as a bridge between the react front-end and a MongoDb data set. 
More personal objectives:
- Learn to use Typescript, mongoose and react. 
- Learn to write custom react components and hooks with a good reusability and simplicity of use. 

## FRONT-END
### Description 
The Front-End part is written in Typescript and uses React functional components. Components are custom, reusable and written as functional components. Many customs hooks are also used. These components and hooks adapt at runtime to most mongoose schemas and their fields types and help create, read, update or delete any items from a data set. There's no "hard-coded" component to read or edit any specific schemas. 
*Note: Further optimizations would be useful to minimize re-rendering and loading time, but the project is otherwise functional.* 

### Dependancies and installs
From the project directory execute the following instruction. This will facilitate the creation and subsequent deployment of the React project to heroku without configuration. 
```
npm install -g create-react-app 
```
The option "-g" seems necessary 
```
create-react-app < my-app > 
```
This will create a functioning React-template app ready for deployment on Heroku without changing the project's configurations. 
Then push on git, deploy on Heroku and run the project. 

*Note: The instructions *create-react-app* and *npx create-react-app* don't seem to produce the same configurations, which will affect later deployment to Heroku. To deploy without change configuration use *create-react-app <...>*.* 

[For complete instructions](https://blog.heroku.com/deploying-react-with-zero-configuration).

#### Axios and Typescript dependancies. 
  axios
  @types/node
  @types/react
  @types/axios
  @types/react-dom

  npm i axios typescript @types/axios @types/node @types/react @types/react-dom


## Back-end (LINK to git back-end part of the project) 
The back-end part is written in Typescript and uses Mongoose and an Express server. It allows CORS (CROSS-origin ressource sharing) for the front-end part. A mock data set is used for development and demo purposes, but is meant as "bridge" between the front-end part and a MongoDb data set. 

### Dependancies and installs
  @types/express 
  @types/node 
  express 
  nodemon 
  ts-node 
  typescript

```
npm i @types/express @types/node express nodemon ts-node typescript
```

## Reference
For complete instructions on how to [create react app ready for heroku deployment](https://blog.heroku.com/deploying-react-with-zero-configuration).
Following these instruction will generate an README.md file which I renamed "createreactappreadme.md".(Link ...) 

For complete instructions on how to [create a typescript-express server ready for heroku deployment](https://dev.to/hte305/simple-deploy-typescript-application-to-heroku-5b6g)

