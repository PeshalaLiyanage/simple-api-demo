// app.js

const express = require('express');
const { sequelize } = require('./db');
const routes = require('./routes');

const app = express();


app.use('/', routes); // Use the routes defined in routes/index.js


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
