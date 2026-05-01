import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: {
      type: String,
      match: /^[0-9]{6}$/,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // Indian mobile
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    address: addressSchema,

    profilePic: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["superadmin", "gatadmin", "collector", "member"],
      default: "member",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes (important for performance)
userSchema.index({ mobile: 1 });
userSchema.index({ email: 1 });
userSchema.index({ name: "text" });

export default mongoose.model("User", userSchema);
