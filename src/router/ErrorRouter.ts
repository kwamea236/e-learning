import { Router, Request, Response } from "express";

const router = Router();

router.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({message: "404 PAGE NOT FOUND"})
});

router.use((req: Request, res: Response)=>{
    res.status(500);
    res.send("INTERNAL SERVER ERROR");
})

export default router;