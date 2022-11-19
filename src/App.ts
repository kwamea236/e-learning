/**
 * Author: Kwame Ato
 * Date: 18th November, 2022
 */

import express, { Express, Request, Response } from "express";
import connectDB, { prisma } from "./ConnectDB";
import { StatusCodes } from "http-status-codes";
import bodyParser from "body-parser";
 

// connect database message
connectDB();

const app: Express = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const PORT = process.env.PORT || 8000;

app.get("/api",async (req: Request, res: Response)=>{
   const allUsers = await prisma.user.findMany()
   console.log(req.body);
    res.json(allUsers);
})

//get route by id

app.get("/api/:id",async (req: Request, res: Response)=>{
    const {id} = req.params;
    const userById = await prisma.user.findUnique({
        where:{
            id: id
        }
    });

    res.json(userById);
})

app.post("/api",async (req: Request, res: Response)=>{
    try{
        const {fullname, email } = req.body;
        const postsData = await prisma.user.create({
            data:{
                fullname: fullname,
                email: email
            }
        })
        res.send("file submited successfully");
    }catch(e){
        console.log(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({message: "Internal server error"});
    }
})

app.put("/api/:id", async (req: Request, res: Response)=>{

    try{
        const {fullname, email} = req.body;
        const {id} = req.params;

        const updateUSer = await prisma.user.update({
            where:{
                id: id,
            },
            data:{
                fullname: fullname,
                email: email
            }
        });

        res.send("user updated successfully");

    }catch(e){
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("STATUS-500 INTERNAL SERVER ERROR")
    }
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