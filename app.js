export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    next();
  });

  app.use((req, res, next) => {
    if (req.path !== "/" && !req.path.endsWith("/")) {
      const query = req.url.includes("?")
        ? req.url.slice(req.url.indexOf("?"))
        : "";
      return res.redirect(301, req.path + "/" + query);
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
    const hash = crypto
      .createHash("sha1")
      .update(req.params.input)
      .digest("hex");

    res.type("text/plain; charset=UTF-8").send(hash);
  });

  app.all("/req/", (req, res) => {
    const addr = req.query.addr || req.body.addr;

    if (!addr) {
      res.status(400).type("text/plain; charset=UTF-8").send("No addr");
      return;
    }

    http.get(addr, response => {
      res.type("text/plain; charset=UTF-8");

      response.on("data", chunk => {
        res.write(chunk);
      });

      response.on("end", () => {
        res.end();
      });
    }).on("error", () => {
      res.status(500).type("text/plain; charset=UTF-8").send("Request failed");
    });
  });

  app.all("*", (req, res) => {
    res.type("text/plain; charset=UTF-8").send("ayham");
  });

  return app;
}
