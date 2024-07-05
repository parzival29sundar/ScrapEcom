import mongoose from "mongoose";

let isConnected = false;

export const connectToDB =  async () => {
    mongoose.set('strictQuery' , true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not definedd');

    if(isConnected) return console.log('=> using existing database connectionss');

    try {
        await mongoose.connect(process.env.MONGODB_URI)

        isConnected = true

        console.log('MongoDB connectedd')
    } catch (error) {
        console.log(error);
    }


}