import mongoose from "mongoose";

const { Schema } = mongoose;

const IPosition = {
  lat: { type: "number", required: true },
  lng: { type: "number", required: true },
};

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
    price: {
      type: "number",
      required: [true, "Please enter a price"],
      default: "за домовленістю",
    },
    description: {
      type: "string",
      required: [true, "Please enter a description"],
    },
    position: {
      type: IPosition,
      required: [true, "Please enter position coordinates"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.models.Advert || mongoose.model("Advert", advertSchema);
