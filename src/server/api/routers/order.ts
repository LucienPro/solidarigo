import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const orderRouter = createTRPCRouter({
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return db.order.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true, // pour avoir les produits liés
      },
    });
  }),
});
