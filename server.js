const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const FORWARD_NUMBERS = [
  "+19738565029",
  "+13474241577",
  "+15043448130"
];

let currentIndex = 0;

app.get("/", (req, res) => {
  res.send("Round robin server is running.");
});

app.post("/next-number", (req, res) => {
  const transferNumber = FORWARD_NUMBERS[currentIndex];
  currentIndex = (currentIndex + 1) % FORWARD_NUMBERS.length;

  res.json({
    transfer_number: transferNumber,
    reason: "Next round robin destination"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
