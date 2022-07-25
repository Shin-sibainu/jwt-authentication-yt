const express = require("express");
const app = express();
const PORT = 5000;

const auth = require("./routes/auth");
const post = require("./routes/post");

app.use(express.json());
app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req, res) => {
  res.send("Hello JWT");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
