import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import routes from "./src/routes/index.js";
import { connectDB } from "./src/utils/db.js";
dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;
// CDN CSS
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(bodyParser.json()); // to use body object in requests
dotenv.config();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
connectDB(URI_DB);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "My API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
      {
        url: "231/",
      },
    ],
  },
  apis: ["./src/**/*.js"],
  cors: true,
};

const specs = swaggerJsDoc(options);

app.use(
  "/v1/docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

app.use("/", routes);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
