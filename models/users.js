import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.Model('User', userSchema);

export default Users;
