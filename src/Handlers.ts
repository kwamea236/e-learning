import {Request, Response} from "express";
import { prisma } from "./ConnectDB.js";
import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req: Request, res: Response)=>{
    try{
        const allUsers = await prisma.user.findMany()
        res.json(allUsers);
    }catch(e){
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("Internal Server error")
    }
}

const getUserById = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const userById = await prisma.user.findUnique({
        where:{
            id: id
        }
    });
    if(userById === null){
        res.send("user not found");
    }
    res.json(userById)
}

const postUser = async (req: Request, res: Response)=>{
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
}


const updateUser = async (req: Request, res: Response)=>{
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
}

const deleteUser = async (req: Request, res: Response)=>{
    try{

        const {id} = req.params;

        const deleteUser = await prisma.user.delete({
            where:{
                id: id
            }
        })

        res.send(`${deleteUser.fullname} has been deleted`)

    }catch(e){
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("internal server error");
    }
}

export {getAllUsers, getUserById, postUser, updateUser, deleteUser};