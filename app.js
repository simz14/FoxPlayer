const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const port = 3000;
app.use(express.static("public"));
//---------------------------------------------------
const mysql = require("mysql");
let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "music_player",
});
conn.connect((err) => {
  if (err) {
    console.error("Cannot connect to the database", err);
    return;
  }
  console.log("Connection established");
});
//---------------------------------------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/player.html"));
});

app.get("/playlist-tracks", (req, res) => {
  const tracksPromise = new Promise((res, rej) => {
    conn.query(`SELECT * FROM tracks`, (err, rows) => {
      if (err) {
        rej({ error: "Error with database" });
      }
      res(rows);
    });
  });

  const apiHandler = async () => {
    const response = await tracksPromise.then((res) => res).catch((err) => err);
    res.send(response);
  };
  apiHandler();
});
app.get("/playlist", (req, res) => {
  const tracksPromise = new Promise((res, rej) => {
    conn.query(`SELECT * FROM playlists`, (err, rows) => {
      if (err) {
        rej({ error: "Error with database" });
      }
      res(rows);
    });
  });

  const apiHandler = async () => {
    const response = await tracksPromise.then((res) => res).catch((err) => err);
    res.send(response);
  };
  apiHandler();
});

app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
