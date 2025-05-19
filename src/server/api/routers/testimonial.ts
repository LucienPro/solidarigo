import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const testimonialRouter = createTRPCRouter({
  // Récupération
  getAll: publicProcedure.query(() => {
    return db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take:10,
    });
  }),

  // Création
  create: publicProcedure
    .input(
      z.object({
        author: z.string().min(2),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      return db.testimonial.create({
        data: {
          author: input.author,
          message: input.message,
        },
      });
    }),
});
