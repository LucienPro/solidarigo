import { db } from "~/server/db";

async function main() {
  // --- Associations ---
  const associations = [
    {
      name: "Team for the Planet",
      description: "Collectif citoyen pour financer des innovations contre le changement climatique.",
      category: "Écologie",
      logoUrl: "/assets/images/teamfortheplanet.png",
      activities: "Investissement citoyen, création de startups climatiques",
      supportReasons: "Transparence, impact mesuré",
      impact: "17M€ levés, 100+ innovations financées",
      goalAmount: 100000,
    },
    {
      name: "Les Restos du Cœur",
      description: "Aide alimentaire et insertion sociale pour les personnes en difficulté.",
      category: "Solidarité",
      logoUrl: "/assets/images/restosducoeur.png",
      activities: "Distribution alimentaire, accompagnement social",
      supportReasons: "Réseau national, actions concrètes",
      impact: "140M de repas distribués chaque année",
      goalAmount: 100000,
    },
    {
      name: "Emmaüs France",
      description: "Communauté solidaire de lutte contre la pauvreté et l'exclusion.",
      category: "Inclusion",
      logoUrl: "/assets/images/emmaus.png",
      activities: "Réinsertion, récupération et vente solidaire",
      supportReasons: "Économie circulaire, réinsertion sociale",
      impact: "Des milliers de personnes réinsérées chaque année",
      goalAmount: 100000,
    },
  ];

  for (const data of associations) {
    await db.association.upsert({
      where: { name: data.name },
      update: {},
      create: data,
    });
  }

  // --- Produits ---
  const products = [
    {
      name: "Gourde climat",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/gourde-planet.png",
      price: 3000,
      stripeProductId: "prod_SELm0vvJlXT2FI",
      stripePriceId: "price_1RJt4gFxdF42kSCJiqiWZYo3",
      associationName: "Team for the Planet",
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { stripeProductId: product.stripeProductId },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        stripeProductId: product.stripeProductId,
        stripePriceId: product.stripePriceId,
        association: {
          connect: { name: product.associationName },
        },
      },
    });
  }

  // --- Témoignages ---
  const testimonials = [
    {
      author: "Claire D.",
      message: "Grâce à Team for the Planet, j’ai découvert des initiatives incroyables.",
    },
  ];

  for (const t of testimonials) {
    await db.testimonial.upsert({
      where: { author: t.author },
      update: {},
      create: t,
    });
  }

  // --- Abonnés newsletter ---
  const subscribers = [
    { email: "claire@example.com" },
  ];

  for (const sub of subscribers) {
    await db.newsletterSubscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: sub,
    });
  }

  // --- Utilisateurs fictifs ---
  const users = [
    {
      id: "user_demo",
      name: "Admin Demo",
      email: "admin@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const u of users) {
    await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }

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
