// STEP 1: REQUIRE EXPRESS
const express = require("express");
const path = require("path");

// STEP 2: CREATE AN "APP" INSTANCE OF EXPRESS
const app = express();

// STEP 3: DEFINE A PORT FOR THE APP TO RUN ON
const PORT = process.env.PORT || 3000;

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
  res.json(jokes);
});

app.get("/api/jokes/:id", function(req, res) {
  const index = parseInt(req.params.id);
  console.log(index);

  if (isNaN(index)) {
    res.status(400);
    return res.send("Please enter a valid id");
  }

  if (index >= 0 && index < jokes.length) {
    res.json(jokes[index]);
  } else {
    res.status(404);
    return res.send("Unable to find a joke with that ID. Please try again");
  }
});

// STEP 4: TELL THE APP TO LISTEN ON THE PORT
app.listen(PORT, () => {
  console.log(`Application running on http://localhost:${PORT}`);
});
