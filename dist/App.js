import express from "express";

const app = express();

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to my component</h1>");
})

app.listen(PORT);