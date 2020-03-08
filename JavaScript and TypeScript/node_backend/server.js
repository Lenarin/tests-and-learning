require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, autoIndex: false}, (err) => {
    if (err) throw err;
});

mongoose.connection.once('open', () => {
    require(`./app/routes`)(app, mongoose);

    app.listen(port, () => {
        console.log(`Start listener on port ${port}`);
    });

});



