const swaggerJSDoc = require('swagger-jsdoc');
const { SWAGGER } = require('../constants/swagger');

const swaggerOptions = {
  definition: {
    openapi: SWAGGER.OPEN_API,
    info: {
      title: SWAGGER.TITLE,
      version: SWAGGER.VERSION,
      description: SWAGGER.DESCRIPTION,
      license: {
        name: SWAGGER.LICENSE.NAME,
        url: SWAGGER.LICENSE.URL,
      },
      contact: {
        name: SWAGGER.CONTACT.NAME,
        email: SWAGGER.CONTACT.EMAIL,
        url: SWAGGER.CONTACT.URL,
      },
    },
    servers: [
      {
        url: SWAGGER.SERVER_URL,
      },
    ],
  },
  apis: [
    './modules/allergy/routes/allergy.route',
    './modules/user/routes/user.route',
  ],
};

const specs = swaggerJSDoc(swaggerOptions);

module.exports = {
  specs,
};
