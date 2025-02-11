import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
