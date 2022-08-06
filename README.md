##  CRUD application for my practice GraphQL technology | [Demo](https://full-graphql.vercel.app/)
server => https://graphql-movies-direcors.herokuapp.com/graphql

## Technologies

- [React](https://reactjs.org/docs/create-a-new-react-app.html) for the frontend
- [URQL](https://formidable.com/open-source/urql/) for **GraphQL** frontend
- [Chakra UI](https://chakra-ui.com/) for UI
- [MongoDB & Mongoose](https://mongoosejs.com/) for the database
- [Node & Express](http://expressjs.com/) for the backend
- [GraphQL Yoga](https://www.graphql-yoga.com/) for **GraphQL** server

## Features

- [x] **C**reate new directors and films
- [x] **R**ead all directors and films
- [x] **U**pdate director and film
- [x] **D**eletr director and film

## Deploying to your computer

First press **'Code'** button and choose **'Download ZIP'**, then unpacking zip to your any folder and open in Visual Studio Code or other program.
Your structure can be like...

```bash
. 
├── server
└── client
```

Open the terminal in two window and write in first window `cd server` and then `npm i` and other window `cd client` and then `npm i`.
Then in first window `npm run dev` and other window `npm start`

Don't forget adding your .env params in folder...

```bash
. 
├── server
│   └── .env  
└── client
    └── .env  
```
