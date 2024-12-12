import mongoose, { Schema } from "mongoose";

const TextSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

export default mongoose.model("Text", TextSchema);