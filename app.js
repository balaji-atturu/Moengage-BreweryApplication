const express = require("express");
const collection = require("./mongo");
const brewery = require("./mongo1");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.use(bodyParser.json());

app.post("/search", async (req, res) => {
  const cityName = req.body.city;
  const breweryName = req.body.name;
  const breweryType = req.body.type;

  try {
    let query = {};

    if (cityName) {
      query.city = cityName;
    }
    if (breweryName) {
      query.name = breweryName;
    }
    if (breweryType) {
      query.brewery_type = breweryType;
    }

    const searchResults = await brewery.find(query);

    if (searchResults.length === 0) {
      res
        .status(404)
        .json({ message: "Your search did not match any results." });
    } else {
      res.status(200).json(searchResults);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addRating", async (req, res) => {
  try {
    const { id, rating } = req.body;

    const breweryDocument = await brewery.findOne({ id });

    if (!breweryDocument) {
      res.status(404).json({ message: "Brewery not found" });
    } else {
      breweryDocument.rating = rating;
      await breweryDocument.save();

      
      const updatedBrewery = await brewery.findOne({ id });

      res
        .status(200)
        .json({ message: "Rating added successfully", updatedBrewery });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addReview", async (req, res) => {
  try {
    const { id, review } = req.body;

    const breweryDocument = await brewery.findOne({ id });

    if (!breweryDocument) {
      res.status(404).json({ message: "Brewery not found" });
    } else {
      breweryDocument.review = review;
      await breweryDocument.save();
      const updatedBrewery = await brewery.findOne({ id });

      res
        .status(200)
        .json({ message: "Rating added successfully", updatedBrewery });
    }
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json("Please provide both email and password.");
    return;
  }

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(8000, () => {
  console.log("port connected");
});
