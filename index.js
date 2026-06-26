import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/login/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.send("ayham");
});

function task(x) {
  return x * this * this;
}

app.get("/sample/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.send(task.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
