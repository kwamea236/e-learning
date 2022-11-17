import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function connectDB(){
    try{
        await prisma.$connect();
        console.log("database connected successfully")
    }catch(e){
        await prisma.$disconnect();
        process.exit(1);
    }finally{
        await prisma.$disconnect();
    }
}

export default connectDB;