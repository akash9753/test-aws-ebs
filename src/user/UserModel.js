import mongoose from "mongoose";

const address = new mongoose.Schema({
  permanentAddress: {
      type: String,
  },
  temproryAddress: {
      type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: [address],
      required: false,
    },
    role: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
