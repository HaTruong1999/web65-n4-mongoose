import mongoose from "mongoose";

const db = () => {
  if (!process.env.MONGO_DB_URL) {
    return console.log('Add mongodb connection string to .env file to connect');
  }

  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongodb Database Connected');
    })
    .catch((error) => {
      console.log(error);
    });
};
export default db;