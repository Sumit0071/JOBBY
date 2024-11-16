import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
  username: { type: String, required: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  country: { type: String, default: '', required: true },
  role: { type: String, enum: ['Admin', 'Viewer'], required: true }
} );

const UserModel = mongoose.model( "User", userSchema );
export default UserModel;