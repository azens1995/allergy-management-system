require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const indexRoutes = require('./modules/index/index.router');
const userRoutes = require('./modules/user/routes/user.route');
const allergyRoutes = require('./modules/allergy/routes/allergy.route');
const fileUpload = require('express-fileupload');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER } = require('./constants/swagger');
const { specs } = require('./config/swagger.config');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

// express-fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    limits: {
      fileSize: 1024 * 1024,
    },
    abortOnLimit: true,
  })
);

app.use('/', indexRoutes);
app.use('/api/allergy', allergyRoutes);
app.use('/api/user', userRoutes);

// Swagger UI
app.use(
  SWAGGER.ENDPOINT,
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log(`Server listening in the port ${port}`);
});
