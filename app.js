const dotenv = require('dotenv').config();
const moment = require('moment');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
let app = express();
app.disable("x-powered-by");
const config = require('./config.json');

const port = process.env.PORT || 5051;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const currentDate = moment();

    let activeCollections = [];

    // Iterate over the collection dates in config.json
    Object.keys(config.collectionDates).forEach((collectionName) => {
      const collectionStartDate = moment(config.collectionDates[collectionName].startDate);
      const collectionEndDate = moment(config.collectionDates[collectionName].endDate);

      if (currentDate.isBetween(collectionStartDate, collectionEndDate)) {
        activeCollections.push(collectionName);
      }
    });

    console.log(activeCollections);

    // Render the index.ejs file and pass the activeCollections data
    let activeCollectionData = [];

    // Fetch images from the active collection dynamically
    for (let i = 0; i < activeCollections.length; i++) {
      const collectionName = activeCollections[i];
      const collectionModel = require(`./models/${collectionName}`);

      let collectionData = await collectionModel.find({});

      activeCollectionData.push({
        collectionName,
        images: collectionData,
      });
    }

    // Render the index.ejs file and pass the activeCollectionData
    res.render('index', { activeCollections: activeCollectionData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const routes = require('./routes/birdsRoute.js');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
