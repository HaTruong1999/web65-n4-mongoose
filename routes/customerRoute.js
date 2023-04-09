import express from "express";
import Customers from "../models/customers.js";
import { v4 as uuidv4 } from 'uuid';

const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  try {
    const {custName, custPhoneNumber} = req.body;
    console.log("req.body: ", req.body);
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

customerRoute.get("/listCustomer", async (req, res) => {
    try {
        const {limit, currentPage} = req.body;
        const skip = (currentPage - 1) * limit;
        await Customers.aggregate([{
                $facet: {
                    meta: [{ $count: "totalItems" }],
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { _id: 0 } }
                    ],
                }
            }
        ]).then(async (docs) => {
            if (docs) {
                const data = {
                    meta: {
                        currentPage: currentPage,
                        limit: limit,
                        totalItems: docs[0].meta[0].totalItems,
                    },
                    data: docs[0].data
                }
                return res.status(200).json({
                    success: true,
                    code: 1,
                    message: "Success!",
                    data: data
                });
            } else {
            throw new CustomHandlerError(404, {
                success: false,
                code: 0,
                message: "Error!",
            });
            }
        });

    } catch (error) {
      res.status(400).json({
        message: error.message,
        data: null,
      });
    }
});

export default customerRoute;