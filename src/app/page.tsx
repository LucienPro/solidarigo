import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/HeroSection";
import { AssociationOfTheDay } from "./_components/AssociationOfTheDay";
import { ThemeList } from "./_components/ThemeList";
import { ProductList } from "./_components/ProductList";
import { NewsletterForm } from "./_components/NewsletterForm";
import { HowItWorksSection } from "./_components/HowItWorksSection";
import { Footer } from "./_components/Footer";
import { CartProvider } from "@/context/CartContext";
import { TestimonialCarouselWrapper } from "./_components/TestimonialCarouselWrapper";

export default function HomePage() {
  return (
    <HydrateClient>
      <CartProvider>
        <main className="text-black bg-white space-y-16">

          {/* Hero Section */}
          <section
            id="hero"
            aria-labelledby="hero-title"
            role="region"
            className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-purple-300 animate-gradient-x text-black"
          >
            <HeroSection />
          </section>

          {/* Comment ça marche */}
          <section
            id="after-hero"
            aria-labelledby="how-it-works-title"
            role="region"
            className="bg-gray-50 py-12 px-6 text-center"
          >
            <HowItWorksSection />
          </section>

          {/* Association du jour */}
          <section
  id="association-jour"
  aria-labelledby="association-day-title"
  role="region"
  className="bg-gray-50 py-24 px-6"
>
  <h2 id="association-day-title" className="text-4xl font-extrabold text-center mb-12">
    Association du jour
  </h2>
  <AssociationOfTheDay />
</section>

          {/* Thématiques solidaires */}
          <section
            id="themes"
            aria-labelledby="themes-title"
            role="region"
            className="py-12 px-6"
          >
            <h2 id="themes-title" className="text-3xl font-bold text-center mb-8">Explorez les thématiques solidaires</h2>
            <ThemeList />
          </section>

          {/* Boutique Solidaire */}
          <section
            id="boutique"
            aria-labelledby="boutique-title"
            role="region"
            className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100"
          >
            <div className="max-w-7xl mx-auto text-center mb-12">
              <h2 id="boutique-title" className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
                Boutique Solidaire
              </h2>
              <p className="text-gray-600 text-lg">
                Offrez ou faites un don tout en soutenant les projets des associations partenaires.
              </p>
            </div>
            <ProductList limit={6} />

          </section>

          {/* Témoignages */}
          <section
            id="temoignages"
            aria-labelledby="temoignages-title"
            role="region"
            className="py-12 px-6 bg-white text-center"
          >
            <h2 id="temoignages-title" className="text-3xl font-bold mb-8">💬 Témoignages & Impact</h2>
            <TestimonialCarouselWrapper />
          </section>

          {/* Newsletter */}
          <section
            id="newsletter"
            aria-labelledby="newsletter-title"
            role="region"
            className="py-12 px-6 bg-gray-50"
          >
            <NewsletterForm />
          </section>

          <Footer />
        </main>
      </CartProvider>
    </HydrateClient>
  );
}
