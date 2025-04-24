import { db } from "~/server/db";

async function main() {

  // 3. Récupération de l'ID de l'association "Green Earth"
  const greenEarth = await db.association.findFirst({
    where: { name: "Green Earth" },
  });

  if (!greenEarth) {
    throw new Error("Association Green Earth non trouvée !");
  }

  // 4. Ajout de produits solidaires liés à Green Earth
  await db.product.createMany({
    data: [
      {
        name: "Mug",
        description: "Un mug solidaire pour vos boissons chaudes ☕",
        price: 1500,
        imageUrl: "/assets/images/mug.png",
        associationId: greenEarth.id,
      },
      {
        name: "Tshirt",
        description: "T-shirt en coton bio, imprimé éthique 👕",
        price: 2500,
        imageUrl: "/assets/images/tshirt.png",
        associationId: greenEarth.id,
      },
      {
        name: "Totebag",
        description: "Totebag pratique et solidaire 👜",
        price: 2000,
        imageUrl: "/assets/images/totebag.png",
        associationId: greenEarth.id,
      },
    ],
  });

  console.log("✅ Données de test insérées avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Une erreur est survenue :", e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
