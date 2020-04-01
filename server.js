// STEP 1: REQUIRE EXPRESS
const express = require("express");

// STEP 2: CREATE AN "APP" INSTANCE OF EXPRESS
const app = express();

// STEP 3: DEFINE A PORT FOR THE APP TO RUN ON
const PORT = 3000;

// STEP 4: TELL THE APP TO LISTEN ON THE PORT
app.listen(PORT, () => {
  console.log(`Application running on http://localhost:${PORT}`);
});
