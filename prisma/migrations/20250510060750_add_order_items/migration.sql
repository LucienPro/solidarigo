-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeCheckoutId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'paid';
