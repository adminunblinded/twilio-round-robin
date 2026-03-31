const express = require("express");
const { twiml: { VoiceResponse } } = require("twilio");

const app = express();
app.use(express.urlencoded({ extended: false }));

const FORWARD_NUMBERS = [
  "+19738565029",
  "+17323713674",
  "+15043448130"
];

let currentIndex = 0;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/voice", (req, res) => {
  const twiml = new VoiceResponse();

  const numberToDial = FORWARD_NUMBERS[currentIndex];
  currentIndex = (currentIndex + 1) % FORWARD_NUMBERS.length;

  const dial = twiml.dial({
    callerId: req.body.To
  });

  dial.number(numberToDial);

  res.type("text/xml");
  res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
