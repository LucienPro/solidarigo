"use client";

import { FaSearch, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaSearch className="text-green-600 text-4xl mb-4" />,
      title: "Trouvez une association",
      description: "Explorez les causes qui vous tiennent à cœur et découvrez des associations locales ou nationales à soutenir.",
    },
    {
      icon: <FaHandHoldingHeart className="text-blue-600 text-4xl mb-4" />,
      title: "Faites un don ou achetez solidaire",
      description: "Contribuez via un don ou en achetant des produits solidaires. Chaque geste compte pour les associations.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
      title: "Engagez-vous sur le terrain",
      description: "Participez à des événements, rejoignez des actions solidaires et devenez acteur du changement.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 text-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">❓ Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 mt-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
