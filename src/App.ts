/**
 * Author: Kwame Ato
 * Date: 18th November, 2022
 */

import express, { Express, Request, Response } from "express";
import connectDB from "./ConnectDB";
import bodyParser from "body-parser"
import cors from "cors";
import router from "./Routers";
import errorRounter from "./ErrorRouter";

 

// connect database message
connectDB();

const app: Express = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const PORT = process.env.PORT;

app.use("/api", router);

/**
 * Custom error page
 */

app.use(errorRounter);


//server
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}\nPress Ctl + C to terminate server`);
})