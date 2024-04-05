import mongoose from "mongoose";

const { Schema } = mongoose;

const advertSchema = new Schema(
  {
    image: {
      type: "string",
      required: [true, "Please attach a photo"],
      default: "",
    },
    title: {
      type: "string",
      required: [true, "Please enter a title"],
    },
    description: {
      type: "string",
      required: [true, "Please enter a description"],
    },
    price: {
      type: "number",
      required: [true, "Please enter a price"],
      default: "за домовленістю",
    },
    location: {
      type: "string",
      required: [true, "Please enter position coordinates"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.models.Advert || mongoose.model("Advert", advertSchema);
