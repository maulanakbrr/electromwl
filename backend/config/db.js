import mongoose from 'mongoose'

// create database connection function
// using env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useCreateIndex: true,  
      useUnifiedTopology: true 
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB