const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { User } = require("../db/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("auth is working");
});

//ユーザー新規登録
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const { email, password } = req.body;

    //入力欄のバリデーションチェック。
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //DBにユーザーが存在するかのチェック。存在したらエラーを吐かせる。
    const user = User.find((user) => user.email === email);
    if (user) {
      return res.status(400).json([
        {
          msg: "すでにそのユーザーは存在します。",
        },
      ]);
    }

    //パスワードのハッシュ化(ランダムな文字列。復号するのは非常に困難)
    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    User.push({
      email,
      password: hashedPassword,
    });

    //トークンの発行(JWT)->セッションIDみたいなもの。トークン=許可証を渡す。
    const token = await JWT.sign(
      {
        email,
      },
      "SECRET_KEY",
      { expiresIn: 60 }
    );

    console.log(email, password);
    // return res.send("auth ok");
    return res.json({
      token: token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = User.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json([
      {
        msg: "そのユーザーは存在しません",
      },
    ]);
  }

  //パスワード照合
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json([
      {
        msg: "パスワードが違います",
      },
    ]);
  }

  const token = await JWT.sign(
    {
      email,
    },
    "SECRET_KEY",
    { expiresIn: 60 }
  );

  return res.json({
    token: token,
  });
});

router.get("/allUsers", (req, res) => {
  return res.json(User);
});

module.exports = router;
