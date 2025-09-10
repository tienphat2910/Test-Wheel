"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import beefData from "@/data/beefData";

// Preload all beef images on mount
function preloadImages(imageUrls: string[]) {
  imageUrls.forEach((url) => {
    const img = new window.Image();
    img.src = url;
  });
}

export default function BeefCarousel() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    // Preload all beef images on first mount
    preloadImages(beefData.map((item) => item.image));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    swiperInstance?.slidePrev();
  };

  const nextSlide = () => {
    swiperInstance?.slideNext();
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
        maxWidth: "1920px",
        height: "auto",
        minHeight: "0"
      }}
    >
      <div
        className="
          w-full flex flex-col items-center
          md:w-[1920px] md:h-auto md:flex-shrink-0
        "
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "auto",
          minHeight: "0"
        }}
      >
        {/* Swiper wrapper */}
        <div
          className="
            w-full
            pl-2 pr-2 md:pl-24 md:pr-24
          "
          style={{
            minHeight: "100%",
            paddingTop: "40px",
            paddingBottom: "40px"
          }}
        >
          <style>{`
            .scrollbar-none::-webkit-scrollbar { display: none; }
            .beef-swiper .swiper-slide {
              transition: all 300ms ease;
              transform: scale(0.75);
              opacity: 0.8;
              z-index: 1;
            }
            .beef-swiper .swiper-slide-prev,
            .beef-swiper .swiper-slide-next {
              transform: scale(0.9);
              opacity: 0.8;
              z-index: 2;
            }
            .beef-swiper .swiper-slide-active {
              transform: scale(1.1);
              opacity: 1;
              z-index: 3;
            }
          `}</style>

          <Swiper
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="beef-swiper"
            modules={[Navigation]}
            spaceBetween={isMobile ? 10 : 32}
            slidesPerView={isMobile ? 1.5 : 2.8}
            centeredSlides={true}
            loop={true}
            navigation={false}
            style={{
              overflow: "visible",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
          >
            {beefData.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
                    flex-shrink-0 w-[240px] md:w-[300px] lg:w-[390px] h-[420px] md:h-[420px] lg:h-[580px] 
                    bg-white rounded-[30px] border-2 border-[#FFF3E2] shadow-lg p-4 md:p-6 
                    flex flex-col items-start overflow-visible mx-auto
                  "
                >
                  <img
                    src={item.image}
                    alt={item.title[0]}
                    width={390}
                    height={280}
                    className="w-full h-[180px] md:h-[240px] lg:h-[280px] object-cover rounded-[20px] mb-4"
                    loading="eager"
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
              </SwiperSlide>
            ))}
          </Swiper>
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
