export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.end();
      return;
    }
    next();
  });

  app.get("/login/", (req, res) => {
    res.type("text/plain; charset=UTF-8").send("ayham");
  });

  app.get("/code/", (req, res) => {
    res.type("text/plain; charset=UTF-8");
    createReadStream(import.meta.url.substring(7)).pipe(res);
  });

  app.get("/sha1/:input/", (req, res) => {
    res.type("text/plain; charset=UTF-8").send(
      crypto.createHash("sha1").update(req.params.input).digest("hex")
    );
  });

  app.all("/req/", (req, res) => {
    const addr = req.query.addr || req.body.addr;
    http.get(addr, r => {
      res.type("text/plain; charset=UTF-8");
      r.pipe(res);
    });
  });

  app.all("*", (req, res) => {
    res.type("text/plain; charset=UTF-8").send("ayham");
  });

  return app;
}
