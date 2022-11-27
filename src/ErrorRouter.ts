import { Router, Request, Response } from "express";

const router = Router();

router.use((req: Request, res: Response)=>{
    res.status(404);
    res.send("404 page not found");
})

router.use((req: Request, res: Response)=>{
    res.status(500);
    res.send("INTERNAL SERVER ERROR");
})

export default router;