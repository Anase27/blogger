import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/middleware';
import { updateBlogInput, createBlogInput } from '@anase/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    };
    Variables:{
        prisma: any,
        userId: string
    }
}>();

blogRouter.get('/bulk',async (c) => {
    try {
        const prisma = c.get('prisma');
        const posts = await prisma.post.findMany({});

        return c.json(posts);
    } catch (error) {
        c.status(503);
        return c.json({
            msg:"Error while fetching posts in bulk",
            error
        });
    }
});


blogRouter.use(authMiddleware)

blogRouter.post('/',async (c) => {
    try {
        const prisma = c.get('prisma');
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
              msg: "Inputs not correct",
            })
        }
        const userId = c.get('userId');

        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
    
  
      return c.json({
        msg:"blog post successful",
        // clie:prisma,
        // blogId:post.id
      });
  
    } catch (error) {
      return c.json({
        msg: "Error when posting blog",
        error
      })
    }
  });
  
blogRouter.put('/',async (c) => {
    try {
        const prisma = c.get('prisma');
        const userId = c.get('userId');
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
              msg: "Inputs not correct"
            })
        }
        
        const updatedPost = await prisma.post.update({
            where:{
                id: body.id,
                authorId: userId
            },
            data:{
                title: body.title,
                content: body.content,
            }
        });
        return c.json({
            msg:"Blog updated successfuly"
        });
    } catch (error) {
        c.status(503);
        return c.json({
            msg:"Error while updating post",
            error
        });
    }
});

blogRouter.get('/:blogId',async (c) => {
    try {
        const prisma = c.get('prisma');
        const id = c.req.param('blogId');
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        });
        return c.json(post);
    } catch (error) {
        c.status(503);
        return c.json({
            msg:"error while fetching post with a id",
            error
        })
    }
});
