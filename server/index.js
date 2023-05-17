import express from 'express';
import cors from 'cors';
import axios from 'axios';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

import { insertRepos, getRepos, getEverything } from './database.js';

const app = express();
app.use(cors());
const port = 3000;

app.get('/repos/:username', (req, res) => {
  const username = req.params.username;
  axios
    .get('https://github.com/' + username + '?tab=repositories')
    .then(async function (response) {
      const dom = new JSDOM(response.data);
      const elements = dom.window.document.querySelectorAll(
        'a[itemprop="name codeRepository"]'
      );
      const repoElements = Array.from(elements);
      const insertPromises = repoElements.map((element) => insertRepos(username, element.textContent.trim()));

      Promise.all(insertPromises)
        .then(async () => {
          const repos = await getRepos(username);
          res.json({ username: username, repos: repos });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while inserting repositories.' });
        });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching repositories.' });
    });
});

app.get('/repos', async (req, res) => {
  const everything = await getEverything();
  res.json(everything);
});


app.listen(port, () => {
  console.log('listening on port', port);
});