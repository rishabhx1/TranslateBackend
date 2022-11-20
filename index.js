const { request } = require("express");
const express = require("express");
const translate = require("@iamtraction/google-translate");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/translate", (req, res) => {
  const sourceLanguage = req.query.source_language;
  const targetLanguage = req.query.target_language;
  const text = req.query.text;

  if (sourceLanguage == null || targetLanguage == null || text == null) {
    res.status(400).send("Bad Request!");
  } else {
    translate(text, { from: sourceLanguage, to: targetLanguage })
      .then((googleRes) => {
        console.log(googleRes.text); // OUTPUT: Je vous remercie
        console.log(googleRes.from.autoCorrected); // OUTPUT: true
        console.log(googleRes.from.text.value); // OUTPUT: [Thank] you
        console.log(googleRes.from.text.didYouMean); // OUTPUT: false
        res.json(googleRes);
      })
      .catch((err) => {
        console.error(err);
        res.status(err.code).send(err);
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
