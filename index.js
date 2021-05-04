const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(router);

app.listen(5000, async () => {
  console.log("Server up on port 3000");
});
