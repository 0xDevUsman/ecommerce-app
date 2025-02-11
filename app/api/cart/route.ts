import { connectDB } from "@/app/lib/mongo";
// import Cart from "@/app/models/cart";

export const POST = async ()=>{
    await connectDB();

}