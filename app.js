var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const port = 3000;
app.use(express.static("public"));
//---------------------------------------------------
/*let mysql = require("mysql");
let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "foxPlayer",
});
conn.connect((err) => {
  if (err) {
    console.error("Cannot connect to the database", err);
    return;
  }
  console.log("Connection established");
});*/
//---------------------------------------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/player.html"));
});

app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
