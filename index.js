const express = require("express");
const app = express();
const port = 5000;

// mongodb+srv://user:1234@boilerplate.rivotso.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://user:1234@boilerplate.rivotso.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongdoDB Connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
