const express = require('express');
const app = express();
// const port = process.env.PORT || 4000;
// const router = require('./config/router');
const { port, dbURI } = require('./config/environment');




const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));
// app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
