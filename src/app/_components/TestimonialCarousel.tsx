"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { api } from "~/trpc/react";
import type { Testimonial } from "@prisma/client";

export const TestimonialCarousel = () => {
  const { data: testimonials = [], isLoading } = api.testimonial.getAll.useQuery();

  if (isLoading) return <p className="text-black text-center">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        spaceBetween={30}
      >
        {testimonials.map((t: Testimonial) => (
          <SwiperSlide key={t.id}>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-700 text-lg italic">“{t.message}”</p>
              <div className="text-sm text-gray-600 mt-4 mb-6">{t.author}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
