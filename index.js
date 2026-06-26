import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res, next) => {
  if (req.path !== "/" && !req.path.endsWith("/")) {
    return res.redirect(301, req.path + "/");
  }
  next();
});

app.get("/login/", (req, res) => {
  res
    .type("text/plain; charset=UTF-8")
    .send("ayham");
});

app.get("/sample/:x/", (req, res) => {
  const x = Number(req.params.x);
  const result = x * x;

  res
    .type("text/plain; charset=UTF-8")
    .send(String(result));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});