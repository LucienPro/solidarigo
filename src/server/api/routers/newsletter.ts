import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const newsletterRouter = createTRPCRouter({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.newsletterSubscriber.create({
          data: { email: input.email },
        });
      }),
  });
  
