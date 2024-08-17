import { createMiddleware } from "hono/factory"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
  
  
export const prismaClientMiddleware = createMiddleware(async (c,next) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        // prisma.post.create
        c.set('prisma',prisma);
        // console.log(prisma);
        // return c.json(prisma);
        await next();
    } catch(e:any){
        c.status(403);
        return c.json({
            msg:"error in prisma client middleware",
            error:e
        });
    }
});

export const authMiddleware = createMiddleware(async (c,next)=>{
    try{
        const jwt = c.req.header('Authorization') || "";
        if(!jwt){
            c.status(404);
            return c.json({error:"Authorization token is null"});
        }
        const token = jwt.split(" ")[1];
        if(!token){
            c.status(404);
            return c.json({error:"Token not found"});
        }
        const payload = await verify(token,c.env.JWT_SECRET);
        
        c.set('userId',payload.id);
        // const pr = c.get('prisma');
        
        // return c.json(pr);
        // console.log(c.get('prisma'));
        
        await next();

    }catch(e){
        c.status(505);
        return c.json({
            msg:"Error in auth middleware",
            error:e
        });
    }
})