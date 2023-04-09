import express from "express";
import Users from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';

const userRoute = express.Router();

userRoute.post("/", async (req, res) => {
  try {
    const {userName, userPhoneNumber} = req.body;
    const newUser = {
        userId: uuidv4(),
        userName: userName,
        userPhoneNumber: userPhoneNumber,
    }
    // insert vao db
    // const newStudent = await studentsCollection.insertOne(studentData);
    await Users.build(newUser).save();
    // if (!newStudent.acknowledged) {
    //   throw new Error("Insert failed");
    // }

    res.status(201).json({
      message: "Success",
      data: {
        ...newUser
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default userRoute;