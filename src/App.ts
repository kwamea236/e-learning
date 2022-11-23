import express, {Express,Request, Response} from "express";

const app: Express = express();

const PORT = process.env.PORT;

app.get("/",(req: Request, res: Response)=>{
    res.send("Welcom you are working");
})

app.listen(PORT,()=>{
    console.log("server is running");
})