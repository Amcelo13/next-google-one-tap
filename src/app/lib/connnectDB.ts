import mongoose, { MongooseError } from "mongoose";

type connectionType = {
    isConnected?: number;
}
//extra object
const connection: connectionType = {}

const connectDB = async () => {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI as string)
        connection.isConnected = db.connections[0].readyState
    }
    catch (err : any) { 
        console.log("Connection Error", err.message);
        mongoose.connection.close();
        process.exit(0)
    }

}

export default connectDB