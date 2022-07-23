const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { User } = require("../db/User");
const bcrypt = require("bcrypt");

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
    const user = User.find((user) => user.email == email);
    if (user) {
      return res.status(400).json([
        {
          msg: "すでにそのユーザーは存在します。",
        },
      ]);
    }

    //パスワードのハッシュ化(ランダムな文字列。復号するのは非常に困難)
    const hashedPassword = await bcrypt.hash(password);

    console.log(email, password);
    return res.send("auth ok");
  }
);

module.exports = router;
