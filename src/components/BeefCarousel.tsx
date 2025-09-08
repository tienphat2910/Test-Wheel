"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import beefData from "@/data/beefData";

export default function BeefCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1: next, -1: prev
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + beefData.length) % beefData.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % beefData.length);
  };

  // Luôn hiển thị 5 item, item giữa lớn nhất, 2 bên nhỏ dần
  const getSlides = () => {
    const total = beefData.length;
    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = (current + offset + total) % total;
      return { ...beefData[index], offset };
    });
  };

  // Scroll item giữa về giữa container
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 260; // bằng w-[260px]
    const gap = 40; // bằng mr-[40px]
    const containerWidth = container.offsetWidth;
    // Item giữa là index 2 trong getSlides()
    const centerIdx = 2;
    // Chỉ scrollTo khi mount hoặc resize, không scroll khi current thay đổi
    // container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  // Animation variants for framer-motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.75,
      zIndex: 10
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.1,
      zIndex: 30,
      transition: { duration: 0.5, type: "spring" as const }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.75,
      zIndex: 10,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div
      className="
        relative flex flex-col items-center
        md:px-0
        overflow-hidden
      "
      style={{
        width: "100%",
        maxWidth: "2226px",
        height: "auto",
        minHeight: "0"
      }}
    >
      <div
        className="
          w-full flex flex-col items-center
          md:w-[2226px] md:h-auto md:flex-shrink-0
        "
        style={{
          width: "100%",
          maxWidth: "120vw",
          height: "auto",
          minHeight: "0"
        }}
      >
        {/* Slide wrapper */}
        <motion.div
          ref={scrollContainerRef}
          className="
            flex justify-center items-center
            w-full
            overflow-x-visible scrollbar-none gap-[24px] md:gap-[40px]
            touch-pan-x
            pl-8 pr-8 md:pl-24 md:pr-24
          "
          style={{
            minHeight: "100%",
            paddingTop: "40px",
            paddingBottom: "40px",
            scrollBehavior: "smooth"
          }}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (!isMobile) return;
            if (info.offset.x < -80) nextSlide();
            else if (info.offset.x > 80) prevSlide();
          }}
        >
          <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
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
            if (item.offset === 0) {
              // Chỉ animate cho item giữa
              return (
                <motion.div
                  key={`center-${current}`}
                  className={
                    "flex-shrink-0 w-[230px] md:w-[300px] lg:w-[360px] h-[420px] md:h-[420px] lg:h-[580px] bg-white rounded-[30px] border-2 border-[#FFF3E2] shadow-lg p-4 md:p-6 flex flex-col items-start overflow-visible"
                  }
                  style={{ zIndex }}
                  initial={{
                    x: direction > 0 ? 300 : -300,
                    opacity: 0,
                    scale: 0.75
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  exit={{
                    x: direction < 0 ? 300 : -300,
                    opacity: 0,
                    scale: 0.75,
                    transition: { duration: 0.3 }
                  }}
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
            } else {
              // Các item bên cạnh không animate, chỉ scale/opacity
              return (
                <div
                  key={`side-${item.title[0]}-${item.offset}`}
                  className={
                    "flex-shrink-0 w-[220px] md:w-[300px] lg:w-[360px] h-[420px] md:h-[420px] lg:h-[580px] bg-white rounded-[30px] border-2 border-[#FFF3E2] shadow-lg p-4 md:p-6 flex flex-col items-start overflow-visible"
                  }
                  style={{ zIndex, transform: `scale(${scale})`, opacity }}
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
                </div>
              );
            }
          })}
        </motion.div>
        {/* Navigation */}
        <div
          className="mt-10 flex justify-center items-center gap-4"
          style={{
            height: "60px",
            flexShrink: 0
          }}
        >
          {/* Nút trái */}
          <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] flex justify-center items-center">
            <button onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] cursor-pointer"
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
          </div>

          {/* Nút phải */}
          <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] flex justify-center items-center">
            <button onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                fill="none"
                className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] cursor-pointer"
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
          </div>
        </div>
      </div>
    </div>
  );
}
