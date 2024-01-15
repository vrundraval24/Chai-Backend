// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.on("ERROR", () => {
      console.log("ERROR: ", error);
    });
    app.listen(port, () => {
      console.log(`App is listening on PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed.", error);
  });

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
