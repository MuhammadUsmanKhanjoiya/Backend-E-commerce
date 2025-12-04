import mongoose from "mongoose";

const DBConnect = async () => {
  try {
      mongoose.connection.on('connected',()=>{
        console.log('MongoDB connectes succesfully');
        
      })
     await mongoose.connect(`${process.env.MONGODB_URL}/ECommerce`)
  } catch (error) {

    console.log("Error in connection " + error.message);
    
  }
};

export default DBConnect;
