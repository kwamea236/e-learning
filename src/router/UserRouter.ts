
import { Request, Response, Router} from "express";
import {prisma} from "../ConnectDB"
const router = Router();


router.get("/user", async (req: Request, res: Response)=>{
    try{
    const allUsers = await prisma.user.findMany({
        include:{
            games: true,
        }
    });
    return res.json(allUsers);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send("internal server error");
    }
})

router.get("/user/:id", async(req: Request, res: Response)=>{
    const {id} = req.params;
    const userById = await prisma.user.findUnique({
        where:{
            id: id
        },
        include:{
            games: true,
        }
    });
    if(userById === null){
        res.send("user not found");
    }
    res.json(userById)
});


router.post("/user", async (req: Request, res: Response)=>{
    const {name, games} = req.body;

    const newUser = await prisma.user.create({
        data:{
            name
        }
    })

    res.json(await prisma.user.findMany());
});


router.put("/user/:id", async (req: Request, res: Response)=>{
    try{
        const {name, games} = req.body;
        const {id} = req.params;

        const updateUSer = await prisma.user.update({
            where:{
                id: id,
            },
            data:{
                name
            }
        });

        res.send("user updated successfully");

    }catch(e){
        console.log(e);
        res.status(500);
        res.send("STATUS-500 INTERNAL SERVER ERROR")
    }
});

router.delete("/user/:id", async (req: Request, res: Response)=>{
    try{

        const {id} = req.params;

        const deleteUser = await prisma.user.delete({
            where:{
                id: id
            }
        })

        res.send(`${deleteUser.name} has been deleted`);

    }catch(e){
        console.log(e);
        res.status(500);
        res.send("internal server error");
    }
})

export default router;