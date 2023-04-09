import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    userName: {
        type: String,
        required: false,
    },
    userPhoneNumber: {
        type: String,
        required: false,
    },
});

UserSchema.statics.build = (attrs) => {
    return new Users(attrs);
};

const Users = mongoose.model("Users", UserSchema);

export default Users;
