import {Request, Response, Router} from "express";
import { prisma } from "./ConnectDB";

const router = Router();

router.get("/", async (req: Request, res: Response)=>{
    try{
        const allUsers = await prisma.user.findMany()
        res.json(allUsers);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send("Internal Server error")
    }
})

router.get("/id", async(req: Request, res: Response)=>{
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
});


router.post("/", async (req: Request, res: Response)=>{
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
        res.status(500);
        res.json({message: "Internal server error"});
    }
});


router.put("/id", async (req: Request, res: Response)=>{
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
        res.status(500);
        res.send("STATUS-500 INTERNAL SERVER ERROR")
    }
});

router.delete("/id", async (req: Request, res: Response)=>{
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
        res.status(500);
        res.send("internal server error");
    }
})

export default router;