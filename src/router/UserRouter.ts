
import { Request, Response, Router} from "express";
import {prisma} from "../ConnectDB"
const router = Router();


router.get("/user", async (req: Request, res: Response)=>{
    try{
    const allUsers = await prisma.user.findMany({
        include:{
            posts: true,
            profile: true,
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
    const {id} = req.params

    const uniqueUser = await prisma.user.findUnique({
        where:{
            id
        },
        include:{
            posts: true,
            profile: true
        }
    })

    res.json(uniqueUser);
});


router.post("/user", async (req: Request, res: Response)=>{
    try{
        const {username , email, age, title, bio} = req.body
        const createUser = await prisma.user.create({
            data:{
                username,
                email,
                age,
                posts: {
                    create:{title}
                },
                profile: {
                    create:{
                        bio
                    }
                }
            }
        })
        res.json(createUser);
    }catch(e){

        console.log(e)
        res.status(500);
        res.send("internal error");
    }
});


router.put("/user/:id", async (req: Request, res: Response)=>{
    try{
        const {id} = req.params;
        const {username , email, age} = req.body;

        const updateUser = await prisma.user.update({
            where:{
                id
            },
            data:{
                email,
                username,
                age
            }
        })

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
        const deleteUser = prisma.user.delete({
            where:{
                id
            }
        });
    
        const deletePost = prisma.post.deleteMany({
            where:{
                authorId: id
            }
        });

        const userIdDelete = prisma.profile.deleteMany({
            where:{
                userId: id
            }
        });

        
        const transaction = await prisma.$transaction([deletePost, deleteUser,userIdDelete]);
    
        res.send("user deleted succcessfully");
    }catch(err){
        console.log(err);
        res.status(500);
        res.send("internal server error");
    }
    
});

export default router;