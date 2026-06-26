export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.enable("strict routing");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  const login = "ayham";

  app.get("/login/", (req, res) => {
    res.type("text/plain").send(login);
  });

  app.get("/code/", (req, res) => {
    res.type("text/plain");
    createReadStream(import.meta.url.substring(7)).pipe(res);
  });

  app.get("/sha1/:input/", (req, res) => {
    res.type("text/plain").send(
      crypto.createHash("sha1").update(req.params.input).digest("hex")
    );
  });

  app.all("/req/", (req, res) => {
    const addr = req.query.addr || req.body.addr;

    res.type("text/plain");

    if (!addr) {
      res.send(login);
      return;
    }

    http.get(addr, response => {
      response.pipe(res);
    }).on("error", () => {
      res.send(login);
    });
  });

  app.all("*", (req, res) => {
    res.type("text/plain").send(login);
  });

  return app;
}
