"use server";
import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
}

const productSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
})

const ProductModel = mongoose.models.products || mongoose.model<IProduct>('products', productSchema)
export default ProductModel;
