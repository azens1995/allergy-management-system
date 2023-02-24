require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const indexRoutes = require('./modules/index/index.router');
const userRoutes = require('./modules/user/routes/user.route');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening in the port ${port}`);
});
