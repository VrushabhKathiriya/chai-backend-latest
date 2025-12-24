// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()



/*
import express from "express"
const app = express()
// function connectDB(){

// }

// connectDB()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR: ", error) // jyare appiaction unable to talk with db at that time this error occur
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        console.log("ERROR:",error)
        throw err
    }

})() 
*/