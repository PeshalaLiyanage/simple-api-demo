// app.js

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/', routes); // Use the routes defined in routes/index.js


const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
