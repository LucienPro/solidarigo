import { db } from "~/server/db";

async function main() {
  // --- Associations ---
  const associations = [
    {
      name: "Team for the Planet",
      description: "Collectif citoyen pour financer des innovations contre le changement climatique.",
      category: "Écologie",
      logoUrl: "/assets/images/logo/teamfortheplanet.png",
      activities: "Investissement citoyen, création de startups climatiques",
      supportReasons: "Transparence, impact mesuré",
      impact: "17M€ levés, 100+ innovations financées",
      goalAmount: 100000,
    },
    {
      name: "Les Restos du Cœur",
      description: "Aide alimentaire et insertion sociale pour les personnes en difficulté.",
      category: "Solidarité",
      logoUrl: "/assets/images/logo/les-restos-du-coeur.png",
      activities: "Distribution alimentaire, accompagnement social",
      supportReasons: "Réseau national, actions concrètes",
      impact: "140M de repas distribués chaque année",
      goalAmount: 100000,
    },
    {
      name: "Emmaüs France",
      description: "Communauté solidaire de lutte contre la pauvreté et l'exclusion.",
      category: "Inclusion",
      logoUrl: "/assets/images/logo/emmaus-france.png",
      activities: "Réinsertion, récupération et vente solidaire",
      supportReasons: "Économie circulaire, réinsertion sociale",
      impact: "Des milliers de personnes réinsérées chaque année",
      goalAmount: 100000,
    },
    {
  name: "AFEV",
  description: "Association qui lutte contre les inégalités éducatives en mobilisant des étudiants bénévoles.",
  category: "Éducation",
  logoUrl: "/assets/images/logo/afev.png",
  activities: "Mentorat d’enfants en difficulté, accompagnement scolaire et projets de quartier",
  supportReasons: "Réduction des inégalités scolaires, engagement citoyen étudiant",
  impact: "Plus de 20 000 jeunes accompagnés chaque année",
  goalAmount: 60000,
},
{
  name: "Croix-Rouge française",
  description: "Acteur majeur de l'action humanitaire et de l'accès aux soins en France.",
  category: "Santé",
  logoUrl: "/assets/images/logo/croix-rouge-logo.jpg",
  activities: "Urgences, secourisme, santé, aide alimentaire, accompagnement social",
  supportReasons: "Réseau national, action de terrain, santé pour tous",
  impact: "Plus de 85 000 bénévoles mobilisés dans toute la France",
  goalAmount: 120000,
},
{
  name: "Les Petits Débrouillards",
  description: "Réseau d'éducation populaire qui rend la science accessible à tous.",
  category: "Culture",
  logoUrl: "/assets/images/logo/Logo_PetitsDebrouillards.jpg",
  activities: "Animations scientifiques, ateliers culturels et numériques, projets citoyens",
  supportReasons: "Accès à la culture scientifique, inclusion numérique",
  impact: "Des milliers d'ateliers chaque année dans toute la France",
  goalAmount: 45000,
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
      name: "Gourde - Team For The Planet",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-planet.png",
      price: 3000,
      stripeProductId: "prod_SELm0vvJlXT2FI",
      stripePriceId: "price_1RJt4gFxdF42kSCJiqiWZYo3",
      associationName: "Team for the Planet",
    },
    {
      name: "Gourde - Les restos du Coeur",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-restos.png",
      price: 3000,
      stripeProductId: "prod_SLFPdNckROquW7",
      stripePriceId: "price_1RQYuvFxdF42kSCJyJILh88X",
      associationName: "Les Restos du Cœur",
    },
    {
      name: "Gourde - Emmaüs France",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-emmaus.png",
      price: 3000,
      stripeProductId: "prod_SLFQVr1fbYm0kw",
      stripePriceId: "price_1RQYvNFxdF42kSCJhkMmbbFV",
      associationName: "Emmaüs France",
    },
    {
      name: "Gourde - AFEV",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-afev.png",
      price: 3000,
      stripeProductId: "prod_SLFQ3tmbn5jVpp",
      stripePriceId: "price_1RQYviFxdF42kSCJS19eWYST",
      associationName: "AFEV",
    },
    {
      name: "Gourde - Croix Rouge Française",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-croix-rouge.png",
      price: 3000,
      stripeProductId: "prod_SLFRp1lN40w8E7",
      stripePriceId: "price_1RQYwHFxdF42kSCJ0VmAZzuu",
      associationName: "Croix-Rouge française",
    },
    {
      name: "Gourde - Les Petits Debrouillards",
      description: "Gourde réutilisable en inox.",
      imageUrl: "/assets/images/produits/gourde-lpd.png",
      price: 3000,
      stripeProductId: "prod_SLFRvnJRsB3sYt",
      stripePriceId: "price_1RQYwZFxdF42kSCJAQ3AXF5f",
      associationName: "Les Petits Débrouillards",
    },
    {
      name: "Sac - Les Restos du Coeur",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-restos-du-coeur.png",
      price: 2500,
      stripeProductId: "prod_SL6vFzQfRQYQHh",
      stripePriceId: "price_1RQY0mFxdF42kSCJSPsvm2eJ",
      associationName: "Les Restos du Cœur",
    },
    {
      name: "Sac - Team For The Planet",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-planet.png",
      price: 2500,
      stripeProductId: "prod_SLFSox4A33ffyx",
      stripePriceId: "price_1RQYx6FxdF42kSCJjxk7TKee",
      associationName: "Team for the Planet",
    },
    {
      name: "Sac - Emmaüs France",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-emmaus.png",
      price: 2500,
      stripeProductId: "prod_SLFSqNmXr0U680",
      stripePriceId: "price_1RQYxPFxdF42kSCJ0Lo3ErxC",
      associationName: "Emmaüs France",
    },
    {
      name: "Sac - AFEV",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-afev.png",
      price: 2500,
      stripeProductId: "prod_SLFSan6JJ9TsdW",
      stripePriceId: "price_1RQYxdFxdF42kSCJeK5U0au5",
      associationName: "AFEV",
    },
    {
      name: "Sac - Croix Rouge Française",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-croix-rouge.png",
      price: 2500,
      stripeProductId: "prod_SLFSERMlsgygGG",
      stripePriceId: "price_1RQYxuFxdF42kSCJFHTKfWC4",
      associationName: "Croix-Rouge française",
    },
    {
      name: "Sac - Les Petits Debrouillards",
      description: "Sac en lin recyclé",
      imageUrl: "/assets/images/produits/sac-lpd.png",
      price: 2500,
      stripeProductId: "prod_SLFTGBKYSwla8P",
      stripePriceId: "price_1RQYy8FxdF42kSCJtkDGzfJi",
      associationName: "Les Petits Débrouillards",
    },
    {
      name: "Tasse - Emmaus France",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-emmaus-france.png",
      price: 2000,
      stripeProductId: "prod_SLEnLOhAS1HIq2",
      stripePriceId: "price_1RQYJzFxdF42kSCJgDYrsQld",
      associationName: "Emmaüs France",
    },
    {
      name: "Tasse - Les Restos du Coeur",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-restos.png",
      price: 2000,
      stripeProductId: "prod_SLFTbTqSqP1iRx",
      stripePriceId: "price_1RQYyRFxdF42kSCJ4Cu0suVC",
      associationName: "Les Restos du Cœur",
    },
    {
      name: "Tasse - Team For The Planet",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-planet.png",
      price: 2000,
      stripeProductId: "prod_SLFU74H30Ffg5h",
      stripePriceId: "price_1RQYzmFxdF42kSCJtwiGbNQZ",
      associationName: "Team for the Planet",
    },
    {
      name: "Tasse - AFEV",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-afev.png",
      price: 2000,
      stripeProductId: "prod_SLFVVRR18Kwts7",
      stripePriceId: "price_1RQZ0AFxdF42kSCJK6DMN1WJ",
      associationName: "AFEV",
    },
    {
      name: "Tasse - Croix Rouge Française",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-croix-rouge.png",
      price: 2000,
      stripeProductId: "prod_SLFV9m5jZREot3",
      stripePriceId: "price_1RQZ0ZFxdF42kSCJ400wBhku",
      associationName: "Croix-Rouge française",
    },
    {
      name: "Tasse - Les Petits Debrouillards",
      description: "Tasse",
      imageUrl: "/assets/images/produits/tasse-lpd.png",
      price: 2000,
      stripeProductId: "prod_SLFVS41mpUl0KW",
      stripePriceId: "price_1RQZ0qFxdF42kSCJOsrDbltu",
      associationName: "Les Petits Débrouillards",
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
