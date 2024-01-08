const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    memoryList: [
      {
        memories: {
          date: { type: String, default: "1" },
          time: { type: String, default: "", trim: true },
          privacy: { type: String, default: "", trim: true },
          heading: { type: String, default: "", trim: true },
          description: { type: String, default: "", trim: true },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("login", UserSchema);
