import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Helper to throw error if required env missing
const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value;
};

// Export all env variables from one place
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  MONGO_URI: requireEnv("MONGO_URI"),

  // Optional fields (use when needed)
  JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};

export default env;
