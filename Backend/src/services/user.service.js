import User from "../models/user.model.js";

export async function listUsers(filter = {}) {
  return User.find(filter).select("-password").lean();
}

export async function getUserById(id) {
  return User.findById(id).select("-password");
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true }).select("-password");
}

export async function removeUser(id) {
  return User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}
