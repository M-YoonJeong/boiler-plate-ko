const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { mongoURI } = require("./config/dev");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongdoDB Connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save(); // 콜백 X

    return res.status(201).json({ success: true });
  } catch (err) {
    // 스키마 유효성 실패
    if (err?.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, message: err.message, errors: err.errors });
    }
    // 유니크 인덱스(중복 키) 충돌
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate key", key: err.keyValue });
    }
    return next(err); // 공통 에러 미들웨어로
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
