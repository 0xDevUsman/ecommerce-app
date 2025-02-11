import mongoose , {Schema , Document} from "mongoose";

interface IProducts extends Document {
    name: string;
    price: number;
    description: string;
    image: string;
    category : string;
    stock: number;
    createdAt: Date;
}

const productSchema = new Schema<IProducts>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
    },
    { timestamps: true }
)

export default mongoose.models.Products || mongoose.model<IProducts>("Products", productSchema);