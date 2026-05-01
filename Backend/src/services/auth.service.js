import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function createUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashed });
  return user.save();
}

export async function findUserByMobile(mobile) {
  return User.findOne({ mobile });
}

export async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.password);
}
