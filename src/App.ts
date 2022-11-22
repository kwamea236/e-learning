/**
 * Author: Kwame Ato
 * Date: 18th November, 2022
 */

import express, { Express, Request, Response } from "express";
import connectDB from "./ConnectDB";
import { StatusCodes } from "http-status-codes";
import bodyParser from "body-parser";
import { deleteUser, getAllUsers, getUserById, postUser, updateUser } from "./Handlers";
import cors from "cors";
 

// connect database message
connectDB();

const app: Express = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const PORT = process.env.PORT || 8000;

app.get("/api",getAllUsers)

app.get("/api/:id",getUserById)

app.post("/api",postUser)

app.put("/api/:id", updateUser)

app.delete("/api/:id",deleteUser)



/**
 * Custom error page
 */

app.use((req: Request, res: Response)=>{
    res.status(StatusCodes.NOT_FOUND);
    res.send("404 page not found");
})

app.use((req: Request, res: Response)=>{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send("INTERNAL SERVER ERROR");
})


//server
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}\nPress Ctl + C to terminate server`);
})