import express from 'express';
import fs from 'fs';
import path from 'path';

const PORT = 8000;

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const app = express();

app.get('/' , (req , res , next) => {
  fs.readFile(path.resolve('./build/index.html') , 'utf-8' , (err , data) => {
    if(err){
      console.log(err);
      return res.status(500).send("error 500");
    } else {

    }
    return res.send(
      data.replace(
        '<div id="root"></div>' ,
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>` ));
  });
});

app.get('/api/hello' , (req , res , next) => {
  return res.send(
    {
      jokes: [
        {
          id: 1,
          title: "exam1",
          body: "testtesttesttest",
        },
        {
          id: 2,
          title: "exam2",
          body: "test2test2test2test2",
        },
      ],
    }
  )
});

app.use(express.static(path.resolve(__dirname , '..' , 'build')));

app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`);
});
