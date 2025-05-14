import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { associationRouter } from "./routers/association";
import { productRouter } from "./routers/product";
import { testimonialRouter } from "./routers/testimonial";
import { newsletterRouter } from "./routers/newsletter";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { orderRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  association: associationRouter,
  product: productRouter,
  testimonial: testimonialRouter,
  newsletter: newsletterRouter,
  stripe: stripeRouter,
  user: userRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);


