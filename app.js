export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    next();
  });

  app.use((req, res, next) => {
    if (req.path !== "/" && !req.path.endsWith("/")) {
      const q = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      res.redirect(301, req.path + "/" + q);
      return;
    }
    next();
  });

  app.get("/login/", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.send("ayham");
  });

  app.get("/code/", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    createReadStream(import.meta.url.substring(7)).pipe(res);
  });

  app.get("/sha1/:input/", (req, res) => {
    const hash = crypto.createHash("sha1").update(req.params.input).digest("hex");
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.send(hash);
  });

  app.all("/req/", (req, res) => {
    const addr = req.query.addr || req.body.addr;

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");

    if (!addr) {
      res.send("ayham");
      return;
    }

    try {
      http.get(addr, r => {
        r.pipe(res);
      }).on("error", () => {
        res.send("ayham");
      });
    } catch (e) {
      res.send("ayham");
    }
  });

  app.all("*", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.send("ayham");
  });

  return app;
}
