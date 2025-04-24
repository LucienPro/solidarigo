import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const testimonialRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }),
});
