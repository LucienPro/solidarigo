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

  getByIdWithStats: publicProcedure
  .input(z.string().uuid())
  .query(async ({ input }) => {
    const association = await db.association.findUnique({
      where: { id: input },
      include: {
        products: true,
      },
    });

    if (!association) throw new Error("Association introuvable");

    const priceIds = association.products
      .map((p) => p.stripePriceId)
      .filter((id): id is string => !!id);

    const orderItems = await db.orderItem.findMany({
      where: {
        priceId: {
          in: priceIds,
        },
      },
    });

    const totalCagnotte = orderItems.reduce((sum, item) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    const currentAmount = Math.floor(totalCagnotte * 0.33); // 💚 33 % reversés

    return {
      ...association,
      currentAmount,
    };
  }),
  getAllWithStats: publicProcedure.query(async () => {
  const associations = await db.association.findMany({
    include: {
      products: true,
    },
  });

  const allPriceIds = associations.flatMap((asso) =>
    asso.products.map((p) => p.stripePriceId).filter((id): id is string => !!id)
  );

  const allOrderItems = await db.orderItem.findMany({
    where: {
      priceId: {
        in: allPriceIds,
      },
    },
  });

  const priceIdToItemsMap = new Map<string, typeof allOrderItems>();

  for (const item of allOrderItems) {
    const items = priceIdToItemsMap.get(item.priceId) ?? [];
    priceIdToItemsMap.set(item.priceId, [...items, item]);
  }

  // 💚 Calcul du currentAmount pour chaque asso
  const associationsWithStats = associations.map((asso) => {
    const totalRevenue = asso.products.reduce((sum, product) => {
      const items = product.stripePriceId
        ? priceIdToItemsMap.get(product.stripePriceId) ?? []
        : [];

      const revenueForProduct = items.reduce((acc, item) => {
        return acc + item.unitPrice * item.quantity;
      }, 0);

      return sum + revenueForProduct;
    }, 0);

    const currentAmount = Math.floor(totalRevenue * 0.33);

    return {
      ...asso,
      currentAmount,
    };
  });

  return associationsWithStats;
}),

});


