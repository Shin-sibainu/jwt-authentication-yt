const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db/Post");
const checkAuth = require("../middleware/checkAuth");

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

// router.get(
//   "/private",
//   (req, res, next) => {
//     const userVaild = false;
//     // const userVaild = true;

//     if (!userVaild) {
//       res.status(400).json({
//         msg: "権限がありません",
//       });
//     } else {
//       next();
//     }
//   },
//   (req, res) => {
//     res.json(privatePosts);
//   }
// );
router.get("/private", checkAuth, (req, res) => {
  res.json(privatePosts);
});

module.exports = router;
