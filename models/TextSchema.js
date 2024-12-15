import mongoose, { Schema } from "mongoose";

const TextSchema = new Schema({
  id: String,
  text: {
    type: String,
    required: true
  }
});

export default mongoose.model("Text", TextSchema);