import connectDB from "@/app/lib/connnectDB";
import ProductModel from "@/app/models/product.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB()
    try{
        const products = await ProductModel.find({})
        return NextResponse.json(products)
    }
    catch(err:any){
        return NextResponse.json({error: err.message})
    }
}