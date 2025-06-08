import { Hono } from 'hono'
import { prismaClientMiddleware,authMiddleware } from './middlewares/middleware'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	};
  Variables:{
    prisma: any,
    userId: string
  }
}>().basePath('/api/v1/');

// MIDDLEWARES
app.use(prismaClientMiddleware)

// ROUTES
app.get('/', (c) => {
  return c.text('Hello hooman!')
});
// app.get('', (c) => {
//   return c.text('Hello hooman!')
// });
app.use('/*', cors())
app.route('/user', userRouter);
app.route('/blog', blogRouter);


export default app