const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.use(cors());

const apps = require('./store.js');

app.get('/apps', (req, res) => {
  const { genre , sort } = req.query;
  if(sort) {
      if(!['app', 'rating'].includes(sort)) {
          return res
          .status(400)
          .send('sort must be one of app or rating');
      }
  }
  if(genre) {
    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(sort)) {
        return res
        .status(400)
        .send('must select genre from the list');
    }
}

  let results = apps
    .filter(app => 
        app
        .Genres
        .includes(genre));
 

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }
    res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});