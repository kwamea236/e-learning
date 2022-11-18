import express, { Express, Request, Response } from "express";
import connectDB, { prisma } from "./ConnectDB";
import { StatusCodes } from "http-status-codes";
 

// connect database message
connectDB();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.get("/",async (req: Request, res: Response)=>{
    const user = await prisma.user.findMany()
    res.json(user);
})

app.post("/",async (req: Request, res: Response)=>{
   
})




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