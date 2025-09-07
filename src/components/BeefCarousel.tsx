"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import beefData from "@/data/beefData";

export default function BeefCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + beefData.length) % beefData.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % beefData.length);
  };

  const getSlides = () => {
    const total = beefData.length;
    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = (current + offset + total) % total;
      return { ...beefData[index], offset };
    });
  };

  return (
    <div
      className="
        relative flex flex-col items-center
        px-2 md:px-0
        pt-8 md:pt-10
      "
      style={{
        width: "100%",
        maxWidth: "2006px",
        height: "auto",
        minHeight: "0"
      }}
    >
      <div
        className="
          w-full flex flex-col items-center
          md:w-[2006px] md:h-auto md:flex-shrink-0
        "
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "auto",
          minHeight: "0"
        }}
      >
        {/* Slide wrapper */}
        <div
          className="
            flex justify-center items-center
            w-full
            overflow-hidden
          "
          style={{
            minHeight: "100%",
            paddingTop: "16px",
            paddingBottom: "16px"
          }}
        >
          {getSlides().map((item, idx) => {
            // Tính toán scale và opacity dựa trên offset
            let scale = 0.75;
            let opacity = 0.5;
            let zIndex = 10;

            if (item.offset === 0) {
              scale = 1.1;
              opacity = 1;
              zIndex = 30;
            } else if (Math.abs(item.offset) === 1) {
              scale = 0.95;
              opacity = 0.9;
              zIndex = 20;
            } else if (Math.abs(item.offset) === 2) {
              scale = 0.9;
              opacity = 0.6;
              zIndex = 15;
            }

            // Chỉ margin phải cho các slide trừ slide cuối cùng
            let margin = "";
            if (idx !== getSlides().length - 1) margin = "mr-[40px]";

            return (
              <motion.div
                key={`${current}-${item.offset}`}
                animate={{
                  scale: scale,
                  opacity: opacity
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className={`
                  flex-shrink-0 w-[260px] md:w-[360px] lg:w-[420px]
                  h-[420px] md:h-[420px] lg:h-[580px]
                  bg-white rounded-[30px] border-2 border-[#FFF3E2]
                  shadow-lg p-4 md:p-6 flex flex-col items-start
                  ${margin}
                  overflow-visible
                `}
                style={{ zIndex }}
              >
                <img
                  src={item.image}
                  alt={item.title[0]}
                  className="w-full h-[180px] md:h-[240px] lg:h-[280px] object-cover rounded-[20px] mb-4"
                />
                <h3 className="text-lg md:text-2xl font-bold text-left text-black leading-snug utm-centur">
                  {item.title[0]} <br />
                  <span className="font-semibold">{item.title[1]}</span>
                </h3>
                {item.description.map((desc, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-lg text-black text-left mt-2 leading-relaxed kelson"
                  >
                    {desc}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </div>
        {/* Navigation */}
        <div
          className="mt-10 flex justify-center items-center gap-4"
          style={{
            height: "60px",
            flexShrink: 0
          }}
        >
          {/* Nút trái */}
          <motion.div
            className="w-[48px] h-[48px] md:w-[60px] md:h-[60px]"
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <button onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                className="w-[48px] h-[48px] md:w-[60px] md:h-[60px]"
                fill="none"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="29"
                  fill="black"
                  fillOpacity="0.1"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
                <path
                  d="M28.6364 40.9092C27.0779 37.8296 25.4245 32.0454 17.7273 30.0001"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />{" "}
                <path
                  d="M28.6364 19.0908C27.0779 22.1704 25.4245 27.9546 17.7273 29.9999"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />{" "}
                <path
                  d="M19.2727 30.0002L40.9091 30.0002"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </motion.div>

          {/* Nút phải */}
          <motion.div
            className="w-[48px] h-[48px] md:w-[60px] md:h-[60px]"
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <button onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                fill="none"
                className="w-[48px] h-[48px] md:w-[60px] md:h-[60px]"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="29"
                  fill="black"
                  fillOpacity="0.1"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
                {/* Mũi tên phải */}
                <path
                  d="M31.3636 19.0908C32.9221 22.1704 34.5755 27.9546 42.2727 29.9999"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
                <path
                  d="M31.3636 40.9092C32.9221 37.8296 34.5755 32.0454 42.2727 30.0001"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
                <path
                  d="M40.7273 30.0002L19.0909 30.0002"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
