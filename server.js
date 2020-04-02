// STEP 1: REQUIRE EXPRESS
const express = require("express");
const path = require("path");
const fs = require("fs");

// STEP 2: CREATE AN "APP" INSTANCE OF EXPRESS
const app = express();

// STEP 3: DEFINE A PORT FOR THE APP TO RUN ON
const PORT = process.env.PORT || 3000;

// STEP N: INCLUDE MIDDLEWARE SO THAT POSTS GENERATE REQ.BODY
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jokes = [
  {
    intro: "What do you call a skinny ghost?",
    punchline: "BOOLEAN.",
    rating: 10
  },
  {
    intro: "Why does Yoda’s code always crash?",
    punchline: "Because there is no try.",
    rating: 4
  },
  {
    intro: "I was having a hard time understanding source control…",
    punchline: "but i’m starting to git it.",
    rating: 7
  }
];

// STEP 5: CREATE ROUTES
app.get("/", function(req, res) {
  //   res.send("Welcome to the homepage");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/jokes", function(req, res) {
  fs.readFile("jokes.json", function(err, data) {
    if (err) {
      res.status(500);
      return res.send("An error occurred retrieving jokes.");
    }
    const retrievedJokesArray = JSON.parse(data);
    res.json(retrievedJokesArray);
  });
});

app.get("/api/jokes/:id", function(req, res) {
  const index = parseInt(req.params.id);
  console.log(index);

  if (isNaN(index)) {
    res.status(400);
    return res.send("Please enter a valid id");
  }

  fs.readFile("jokes.json", function(err, data) {
    if (err) {
        console.log(err);
      res.status(500);
      return res.send("An error occurred retrieving jokes.");
    }
    const retrievedJokesArray = JSON.parse(data);
    if (index >= 0 && index < retrievedJokesArray.length) {
      res.json(retrievedJokesArray[index]);
    } else {
      res.status(404);
      return res.send("Unable to find a joke with that ID. Please try again");
    }
  });
});

app.post("/api/jokes", function(req, res) {
  console.log(req.body);
  fs.readFile("jokes.json", function(err, data) {
    if (err) {
      res.status(500);
      return res.send("An error occurred retrieving jokes.");
    }
    const jokesArray = JSON.parse(data);
    jokesArray.push(req.body);
    console.log(jokesArray);
    fs.writeFile("jokes.json", JSON.stringify(jokesArray), function(err) {
      if (err) {
        res.status(500);
        return res.send("An error occurred saving your joke.");
      }
      res.send("Your joke was successfully created");
    });
  });
});

// STEP 4: TELL THE APP TO LISTEN ON THE PORT
app.listen(PORT, () => {
  console.log(`Application running on http://localhost:${PORT}`);
});
