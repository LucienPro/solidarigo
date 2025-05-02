import { db } from "~/server/db";

async function main() {
  // --- Association : Team for the Planet ---
  const association = await db.association.create({
    data: {
      name: "Team for the Planet",
      description: "Collectif citoyen pour financer des innovations contre le changement climatique.",
      category: "écologie",
      logoUrl: "/assets/images/teamfortheplanet.png",
      activities: "Investissement citoyen, création de startups climatiques",
      supportReasons: "Transparence, impact mesuré",
      impact: "17M€ levés, 100+ innovations financées",
    },
  });

  // --- Produit lié à Stripe ---
  await db.product.create({
    data: {
      name: "Gourde climat",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/gourde-planet.png",
      price: 3000,
      stripeProductId: "prod_SELm0vvJlXT2FI",
      stripePriceId: "price_1RJt4gFxdF42kSCJiqiWZYo3",
      associationId: association.id,
    },
  });

  // --- Témoignage ---
  await db.testimonial.create({
    data: {
      author: "Claire D.",
      message: "Grâce à Team for the Planet, j’ai découvert des initiatives incroyables.",
    },
  });

  // --- Abonné newsletter ---
  await db.newsletterSubscriber.create({
    data: {
      email: "claire@example.com",
    },
  });

  // --- Utilisateur (fictif, sans login complet) ---
  await db.user.create({
    data: {
      id: "user_demo",
      name: "Claire Demo",
      email: "claire@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("✅ Seed exécuté avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
