import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";
//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://pk22:Palak22@cluster0.dcaid.mongodb.net/datedb?retryWrites=true&w=majority";
//Middlewares
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World!!");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  console.log(req.body);
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listner
app.listen(port, () => console.log(`Listning on localhost: ${port}`));
