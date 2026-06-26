export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    next();
  });

  app.options("*", (req, res) => {
    res.end();
  });

  app.get("/login/", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("ayham");
  });

  app.get("/code/", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    createReadStream(import.meta.url.substring(7)).pipe(res);
  });

  app.get("/sha1/:input/", (req, res) => {
    const hash = crypto.createHash("sha1").update(req.params.input).digest("hex");
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end(hash);
  });

  app.all("/req/", (req, res) => {
    const addr = req.query.addr || req.body.addr;

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");

    http.get(addr, r => {
      let data = "";

      r.on("data", chunk => {
        data += chunk;
      });

      r.on("end", () => {
        res.end(data);
      });
    }).on("error", () => {
      res.end("ayham");
    });
  });

  app.all("*", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("ayham");
  });

  return app;
}
