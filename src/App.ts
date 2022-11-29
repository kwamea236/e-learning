/**
 * Author: Kwame Ato
 * Date: 18th November, 2022
 */

/**
 * Import statement
 */
import express, { Express, Request, Response } from "express";
import connectDB from "./ConnectDB";
import cors from "cors";
import router from "./router/UserRouter";
import errorRounter from "./router/ErrorRouter";
import bodyParser from "body-parser";


// connect database message
connectDB();


const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())



const PORT = process.env.PORT || 3000;


/**
 * route here
 */
app.use("/api", router);

/**
 * Custom error page
 */

app.use(errorRounter);


//server
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}\nPress Ctl + C to terminate server`);
})

export default app;