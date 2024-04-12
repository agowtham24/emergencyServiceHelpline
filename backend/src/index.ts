import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users";
import { serviceRouter } from "./routes/services";
import { userConnectedServiceRouter } from "./routes/userconectedservice";
import { reviewRouter } from "./routes/reviews";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const db_url = "mongodb://127.0.0.1:27017/emergencyHelplineService";
const publicFolder = path.join(process.cwd(), "public");
app.use(express.static(publicFolder));
const foldersToCreate = ["serviceImages"];
async function server() {
  try {
    await mongoose.connect(db_url);
    console.log("Connected to database");
    // check if public folder exists
    if (!fs.existsSync(publicFolder)) {
      fs.mkdirSync(publicFolder);
    }
    // create folders
    foldersToCreate.forEach((folder) => {
      if (!fs.existsSync(path.join(publicFolder, folder))) {
        fs.mkdirSync(path.join(publicFolder, folder));
      }
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();

app.use("/users", usersRouter);
app.use("/services", serviceRouter);
app.use("/userconnectedservice", userConnectedServiceRouter);
app.use("/reviews", reviewRouter);
