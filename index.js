import { config } from "dotenv";
import db from "./configs/db.js";
config();
import express from "express";

// import { client } from "./configs/connectDB.js";
import userRoute from "./routes/userRoute.js";
import customerRoute from "./routes/customerRoute.js";


const app = express();
const PORT = process.env.PORT;


async function main() {
  try {
    // connect to mongodb
    // await client.connect();
    // console.log("Connected to mongodb successfully");

    // connect to mongoose 
    db();

    // set up middlewares
    app.use(express.json());
    app.use("/api/v1/users", userRoute);
    app.use("/api/v1/customers", customerRoute);

    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // handle error here
  }
}

main();
