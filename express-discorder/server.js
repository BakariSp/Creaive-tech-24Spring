require("dotenv").config();
const express = require("express");
const axios = require("axios").default;
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
let imagesHtmlStorage = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
  const content = ":wave: Hi " + req.body.sender.login;
  const avatarUrl = req.body.sender.avatar_url;
  const login = req.body.sender.login; // Capture the login

  axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: content,
    embeds: [{ image: { url: avatarUrl } }],
  })
  .then((discordResponse) => {
    console.log("Success!");
    // Store both URL and login
    imagesHtmlStorage.push({ url: avatarUrl, login: login }); // Adjust structure as needed
    // Check if the custom header or response body indicates a page refresh
    res.status(204).send();
  })
  .catch((err) => {
    console.error(`Error sending to Discord: ${err}`);
    res.status(500).send("An error occurred");
  });
});


// Server-side code in Express
app.get('/images', (req, res) => {
  res.json({ images: imagesHtmlStorage }); // This will now correctly send an array
});



// GET handler to display stored image
app.get('/github', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});




app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error})
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
