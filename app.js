export default function appSrc(express, bodyParser, createReadStream, crypto, http, MongoClient) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    next();
  });

  app.get("/login/", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("ayham");
  });

  app.post("/insert/", async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const URL = req.body.URL;

    const client = await new MongoClient(URL).connect();
    const db = client.db();
    const collection = db.collection("users");

    await collection.insertOne({ login, password });

    await client.close();

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("ayham");
  });

  app.all("*", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("ayham");
  });

  return app;
}
