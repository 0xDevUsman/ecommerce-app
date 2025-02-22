import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true },
      image: {
        type: mongoose.Schema.Types.Array || mongoose.Schema.Types.String,
        required: true,
      },
    },
  ],  
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
