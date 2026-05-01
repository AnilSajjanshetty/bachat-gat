import Bachat from "../models/bachat.model.js";

export async function createBachat(data) {
  return Bachat.create(data);
}

export async function listBachats(filter = {}) {
  return Bachat.find(filter)
    .populate("members.user", "name mobile email")
    .lean();
}

export async function getBachat(id) {
  return Bachat.findById(id).populate("members.user", "name mobile email");
}

export async function addMember(id, member) {
  return Bachat.findByIdAndUpdate(
    id,
    { $push: { members: member } },
    { new: true },
  ).populate("members.user", "name mobile email");
}

export async function addTransaction(id, tx) {
  return Bachat.findByIdAndUpdate(
    id,
    { $push: { transactions: tx } },
    { new: true },
  );
}
