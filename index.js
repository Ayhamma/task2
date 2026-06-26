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
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.send("ayham");
});

function task(x) {
  return new Promise((resolve, reject) => {
    if (x < 18) {
      resolve("yes");
    } else {
      reject("no");
    }
  });
}

app.get("/promise/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.send(task.toString());
});

app.get("/fetch/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.send(`
<!DOCTYPE html>
<html>
<body>
<input id="inp">
<button id="bt">OK</button>

<script>
document.getElementById("bt").onclick = async function () {
  const inp = document.getElementById("inp");
  const response = await fetch(inp.value);
  const text = await response.text();
  inp.value = text;
};
</script>
</body>
</html>
`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
