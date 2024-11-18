"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/image-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://image.lexica.art/full_webp/80086880-d0cb-44ea-8854-82137fb0fb96",
    "https://image.lexica.art/full_webp/445bfe59-8891-4961-9c08-deae0d5f293b",
    "https://image.lexica.art/full_webp/008680dd-446e-4b39-830e-ac48ef6f9a4b",
    "https://image.lexica.art/full_webp/c8921ece-1e50-4bff-b1b9-ab8ab20f937d",
  ];
  return (
    <ImagesSlider
      className="h-full"
      images={images}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-2xl lg:text-4xl  text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          <br />
        </motion.p>
      </motion.div>
    </ImagesSlider>
    
  );
}
