// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});


import connectDB from "./db/db.js";

import express from "express";
const app = express();


connectDB();

















// Simple way of writing function
// async function connectDB() {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//         app.on('ERROR', (error) => {
//             console.log(error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port: ${process.env.PORT}`)
//         })

//     }catch(e){
//         console.error("ERROR: ", e);
//         throw e;
//     }
// }
// connectDB();

// IIFE
// (async () => {
//   try {
//     console.log(process.env.MONGODB_URI);
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//     app.on("ERROR", (error) => {
//       console.log(error);
//       throw error;
//     });

//     console.log("Database connected successfully.");

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port: ${process.env.PORT}`);
//     });
//   } catch (e) {
//     console.error("ERROR: ", e);
//     throw e;
//   }
// })();
