import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import societyRoutes from "./routes/societies.js";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/societies", societyRoutes);

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

//Use the lower functions to avoid deprecation warnings. And the connect function will return a promise so we have to handle that promise.
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfully established"));

//server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
