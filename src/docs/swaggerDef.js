const config = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Express API with Swagger",
    version: "0.1.0",
    description: "My API Documentation",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
