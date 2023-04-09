import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    custId: {
      type: String,
      required: true,
    },
    custName: {
        type: String,
        required: false,
    },
    custPhoneNumber: {
        type: String,
        required: false,
    },
});

CustomerSchema.statics.build = (attrs) => {
    return new Customers(attrs);
};

const Customers = mongoose.model("Customers", CustomerSchema);

export default Customers;