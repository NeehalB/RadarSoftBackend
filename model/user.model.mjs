import mongoose from "mongoose";
const UserSchema = mongoose.Schema;

const userModel = new UserSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", userModel);
