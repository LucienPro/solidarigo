import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const associationRouter = createTRPCRouter({
  // Récupération des assos
  getAll: publicProcedure.query(async () => {
    return await db.association.findMany();
  }),

  // ✅ Création d’une nouvelle asso
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        description: z.string().min(5),
        category: z.string().min(3),
      })
    )
    .mutation(async ({ input }) => {
      return await db.association.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
        },
      });
    }),
    delete: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      return await db.association.delete({
        where: { id: input },
      });
    }),

    update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(2),
        description: z.string().min(5),
        category: z.string(),
        logoUrl: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.association.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          logoUrl: input.logoUrl ?? undefined,
        },
      });
    }),

    getById: publicProcedure
  .input(z.string().uuid())
  .query(async ({ input }) => {
    return await db.association.findUnique({
      where: { id: input },
      include: {
        products: true,
      },
    });
  }),


    getByCategory: publicProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    return ctx.db.association.findMany({
      where: {
        category: input,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

});
