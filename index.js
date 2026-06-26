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

app.get("/sample/:x/", (req, res) => {
  const x = Number(req.params.x);
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.send(String(x * x));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
