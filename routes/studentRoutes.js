import express from "express";
import Customers from "../models/customers.js";
import { v4 as uuidv4 } from 'uuid';

const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  try {
    const {custName, custPhoneNumber} = req.body;

    const newCustomer = {
        custId: uuidv4(),
        custName: custName,
        custPhoneNumber: custPhoneNumber,
    }
    // insert vao db
    // const newStudent = await studentsCollection.insertOne(studentData);
    await Customers.build(newCustomer).save();

    res.status(201).json({
      message: "Success",
      data: {
        ...newCustomer
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default customerRoute;