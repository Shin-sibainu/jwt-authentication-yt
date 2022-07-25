const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //トークン認証(トークンを持っているクライアントならプライベート記事が見れる)
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "トークンが見つかりません",
        },
      ],
    });
  }

  try {
    let user = await JWT.verify(token, "SECRET_KEY");
    // req.user = user.email;
    console.log(req);
    console.log(user.email);
    next();
  } catch {
    return res.status(400).json({
      errors: [
        {
          msg: "トークンが一致しません",
        },
      ],
    });
  }
};
