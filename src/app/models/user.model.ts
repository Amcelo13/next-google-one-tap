"use server";
import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean
}

const UserSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
})

const UserModel = mongoose.models?.users || mongoose.model<IUser>('users', UserSchema)
export default UserModel;
