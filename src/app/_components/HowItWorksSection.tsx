"use client";

import { FaSearch, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaSearch className="text-green-600 text-5xl mb-4" />,
      title: "Trouvez une association",
      description:
        "Explorez les causes qui vous tiennent à cœur et découvrez des associations nationales à soutenir.",
    },
    {
      icon: <FaHandHoldingHeart className="text-blue-600 text-5xl mb-4" />,
      title: "Faites un don ou achetez solidaire",
      description:
        "Contribuez via un don ou en achetant des produits solidaires. Chaque geste compte pour les associations.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-5xl mb-4" />,
      title: "Engagez-vous sur le terrain",
      description:
        "Participez à des événements, rejoignez des actions solidaires et devenez acteur du changement.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 text-black">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Comment ça marche ?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          En 3 étapes simples, découvrez, soutenez et agissez pour des causes solidaires près de chez vous.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 mt-4">{step.title}</h3>
              <p className="text-gray-600 text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
