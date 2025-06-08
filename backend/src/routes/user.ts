import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signinInput,signupInput } from '@anase/medium-common';
import { authMiddleware } from '../middlewares/middleware';


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    };
    Variables:{
        prisma: any,
        userId: string
    }
}>();


userRouter.post('/signup',async (c) => {

    try{
      const prisma = c.get('prisma');
      const body = await c.req.json();
      const siu = signupInput.safeParse(body);
      if(!siu.success){
        c.status(411);
        return c.json({
          msg: "Inputs not correct",
          siu,
        })
      }
      let user = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      })
      if(user) throw "Email already exists";
      
      user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
        //   name: body.name || null
        }
      })
      const jwtToken = await sign({id:user.id},c.env.JWT_SECRET);
      return c.json({token:`${jwtToken}`});
  
    } catch(e){
      c.status(403);
      return c.json({
        msg: "error when signingup",
        error: e
      });
    }
  
  
  });
  
userRouter.post('/signin',async (c) => {
  // const prisma  = new PrismaClient().$extends(withAccelerate());
  try{
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        msg: "Inputs not correct"
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
    if(!user) {
      c.status(403);
      return c.json({error: "User not found"});
    }else if(user.password!=body.password){
      c.status(403);
      return c.json({error:"Password does not match"});
    }

    const jwtToken = await sign({id: user.id},c.env.JWT_SECRET);

    c.status(200);
    return c.json({token:jwtToken});

  }catch(e){
    c.json(500);
    return c.json({
      msg:"error while signingin",
      error:e
    })
  }
});

userRouter.use(authMiddleware);

userRouter.get('/validate',async (c)=>{
  try {
    const userid = c.get('userId');
    if(!userid) throw new Error("not signed by us");
    
    c.status(200)
    return c.json({
      msg:"signed by us"
    })

  } catch (error) {
    c.status(404)
    return c.json({
      error
    })
  }
})