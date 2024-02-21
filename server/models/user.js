import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  cnic: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  designation: {type: String, required: true},
  roles: {type: Array, default: []},
  department: String,
  otp: String,
  deviceToken: String
});

const User = mongoose.model("User", userSchema);

export default User;
