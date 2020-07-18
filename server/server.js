import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const PORT = 8000;

import React from "react";
import ReactDOMServer from "react-dom/server";

const sqlite3 = require("sqlite3").verbose();
const dbName = path.resolve(__dirname, "../db/main.db");
console.log(dbName);

import App from "../src/App";

const app = express();
let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to SQL database");
  }
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get("/", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("error 500");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

//API
app.get("/api/hello", (req, res, next) => {
  getJokes(res);
});

app.post("/api/like/:jokeId" , (req , res , next) => {
  likeJoke(req.params.jokeId , res);
});

app.post("/api/unlike/:jokeId" , (req , res , next) => {
  unlikeJoke(req.params.jokeId , res);
});

//use static
app.use(express.static(path.resolve(__dirname, "..", "build")));

//listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function createTable() {
  db.run(
    "CREATE TABLE IF NOT EXISTS Jokes(uid INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE,body TEXT NOT NULL UNIQUE,likes INTEGER)"
  );

  db.close();
}

function insertJoke(title, body) {
  db.run(
    "INSERT INTO Jokes (title , body , likes , createdDate) VALUES ( ? , ? , ? , ?)",
    [title, body, 1 , Date.now()],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

//insertJoke('what time is it 2?' , 'now its 12 oclock');

function likeJoke(jokeId , res) {
  db.run("UPDATE Jokes SET likes = likes + 1 WHERE uid = (?)" , [jokeId] , (err , rows) => {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    console.log(rows);
    return res.send(rows);
  });
}

function unlikeJoke(jokeId , res) {
  db.run("UPDATE Jokes SET likes = likes - 1 WHERE uid = (?)" , [jokeId] , (err , rows) => {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    console.log(rows);
    return res.send(rows);
  });
}

function getJokes(res) {
  db.all("SELECT * FROM Jokes ORDER BY likes DESC", [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    return res.send(rows);
  });
}
