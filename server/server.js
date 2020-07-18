import express from "express";
import fs from "fs";
import path from "path";

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

app.get("/api/hello", (req, res, next) => {
  getJokes(res);
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

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
    "INSERT INTO Jokes (title , body , likes) VALUES ( ? , ? , ? )",
    [title, body, 1],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  db.close();
}

function getJokes(res) {
    db.all("SELECT * FROM Jokes ORDER BY likes", [], (err, rows) => {
      if (err) {
        console.log(err);
      }
      return res.send(rows);

      db.close();
    });
}
