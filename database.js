import mongoose from "mongoose";

const uri =process.env.URI;
const uriLocal = process.env.DB_URI;


const connectDB = async () => {
  await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})
//המרת שם השדה ל-id (ללא _)
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });
  
export default connectDB;
