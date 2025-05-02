import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await db.product.findMany({
      include: { association: true },
    });
  }),

  // ✅ Ajout d’un produit
  create: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      description: z.string().min(5),
      price: z.number(),
      imageUrl: z.string().optional(),
      associationId: z.string().uuid(),
    }))
    .mutation(async ({ input }) => {
      return await db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          imageUrl: input.imageUrl,
          associationId: input.associationId,
        },
      });
    }),

    delete: publicProcedure
  .input(z.string().uuid())
  .mutation(async ({ input }) => {
    return await db.product.delete({
      where: { id: input },
    });
  }),

  update: publicProcedure
  .input(
    z.object({
      id: z.string().uuid(),
      name: z.string().min(2),
      description: z.string().min(5),
      price: z.number(),
      imageUrl: z.string().optional(),
      associationId: z.string().uuid(),
    })
  )
  .mutation(async ({ input }) => {
    return await db.product.update({
      where: { id: input.id },
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        imageUrl: input.imageUrl,
        associationId: input.associationId,
      },
    });
  }),



});
