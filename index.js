const express = require("express");
const app = express();
const PORT = 5000;

const auth = require("./routes/auth");

app.use(express.json());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello JWT");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
