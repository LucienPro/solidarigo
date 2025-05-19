// app/_components/TestimonialCarouselWrapper.tsx
"use client";

import dynamic from "next/dynamic";

export const TestimonialCarouselWrapper = dynamic(
  () => import("./TestimonialCarousel").then((mod) => mod.TestimonialCarousel),
  { ssr: false }
);
