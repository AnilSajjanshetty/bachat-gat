import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: ["admin", "collector", "member"],
      default: "member",
    },
  },
  { _id: false },
);

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: String,
  date: { type: Date, default: Date.now },
});

const bachatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [memberSchema],
    transactions: [transactionSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Bachat", bachatSchema);
