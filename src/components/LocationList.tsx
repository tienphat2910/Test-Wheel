"use client";
import React, { useRef, useState, useEffect } from "react";
import LOCATIONS from "@/data/locationData";

export default function LocationList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(2); // start từ item thứ 3
  const [isMobile, setIsMobile] = useState(false);

  // Cập nhật isMobile khi mount và khi resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll item idx về giữa container (chỉ mobile)
  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current || !isMobile) return;

    const container = scrollContainerRef.current;
    const cardWidth = 310;
    const gap = 24;
    const containerWidth = container.offsetWidth;

    // Tổng chiều rộng thực của 1 item (card + gap)
    const itemTotal = cardWidth + gap;

    // Tính vị trí scroll sao cho item ở giữa container
    const scrollLeft = idx * itemTotal - (containerWidth - cardWidth) / 2;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    const newIdx = (currentIdx - 1 + LOCATIONS.length) % LOCATIONS.length;
    setCurrentIdx(newIdx);
    setTimeout(() => scrollToIndex(newIdx), 0);
  };

  const handleNext = () => {
    const newIdx = (currentIdx + 1) % LOCATIONS.length;
    setCurrentIdx(newIdx);
    setTimeout(() => scrollToIndex(newIdx), 0);
  };

  // Sync scroll khi resize (chỉ mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        scrollToIndex(currentIdx);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIdx, isMobile]);

  // Scroll lúc mount nếu mobile
  useEffect(() => {
    if (isMobile) {
      scrollToIndex(currentIdx);
    }
    // eslint-disable-next-line
  }, [isMobile]);

  return (
    <div className="relative w-full bg-[#080404]">
      <div
        ref={scrollContainerRef}
        className={`flex flex-row gap-6 overflow-x-auto md:justify-center md:overflow-x-hidden scrollbar-none`}
        style={{
          paddingLeft: isMobile ? `calc(30vw - 155px)` : undefined,
          paddingRight: isMobile ? `calc(30vw - 155px)` : undefined,
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style>
          {`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {LOCATIONS.map((loc, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center justify-end w-[310px] h-[199px] flex-shrink-0 rounded-b-[10px] bg-gradient-to-b from-[#CF3A05] to-[#9E2C03]"
            style={{
              paddingTop: 30,
              paddingBottom: 16,
              marginTop: 52
            }}
          >
            {/* Outer border SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="310"
              height="110"
              viewBox="0 0 310 110"
              fill="none"
              className="absolute top-[-52px] left-0 pointer-events-none"
              style={{ zIndex: 2 }}
            >
              <path
                d="M309.17 9.51594C304.502 9.51594 300.767 5.66679 300.767 0.855366V3.57222e-07L9.233 0V0.855365C9.233 5.66679 5.49831 9.51594 0.829935 9.51594H0L1.56569e-05 100.484H0.829948C5.49832 100.484 9.23302 104.333 9.23302 109.145V110H300.767V109.145C300.767 104.333 304.502 100.484 309.17 100.484H310V9.51594H309.17ZM308.444 98.8802C303.568 99.3079 299.626 103.264 299.315 108.289H10.6854C10.3742 103.264 6.43199 99.3079 1.55614 98.8802L1.55612 11.0128C6.43198 10.6921 10.3742 6.62908 10.6854 1.60381L299.211 1.60381C299.626 6.62908 303.464 10.6921 308.34 11.0128L308.34 98.8802H308.444Z"
                fill="#FFF3E2"
              />
            </svg>

            {/* Title SVG */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[-52px] z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="304"
                height="103"
                viewBox="0 0 304 103"
                fill="none"
              >
                <path
                  d="M293.487 1.34912C294.701 5.98935 298.261 9.55154 302.662 10.9038V92.8774C298.256 94.1291 294.7 97.6944 293.487 102.33H10.5112C9.30189 97.8045 5.85026 94.1319 1.33838 92.8765V10.8003C5.74361 9.54851 9.29934 5.98421 10.5122 1.34912H293.487Z"
                  fill="url(#paint0_linear_355_220)"
                  stroke="#FFF3E2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_355_220"
                    x1="152.409"
                    y1="0.849121"
                    x2="152.409"
                    y2="117.561"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#8F1713" />
                    <stop offset="1" stopColor="#CF3A05" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Title text */}
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end"
                style={{
                  height: 103,
                  width: 304,
                  pointerEvents: "none",
                  paddingBottom: 18
                }}
              >
                {loc.title.map((line, i) => (
                  <span
                    key={i}
                    className="utm-centur text-[#FFF3E2] text-[18px] md:text-[20px] leading-tight uppercase"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: 1
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>

            {/* Info content */}
            <div
              className="flex flex-col items-center justify-center text-white px-4 w-full z-10"
              style={{ minHeight: 110 }}
            >
              <div className="text-[16px] md:text-[20px] font-bold text-center leading-tight mb-2 kelson">
                {loc.address}
              </div>
              <div className="text-[16px] md:text-[20px] font-bold kelson text-center flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <path
                    d="M16.0621 18.9693C14.1077 20.9236 9.10282 19.0873 4.88327 14.8677C0.663724 10.6482 -1.17261 5.64325 0.781703 3.68893L2.06847 2.40216C2.9568 1.51383 4.42054 1.53731 5.33784 2.45461L7.33092 4.4477C8.24822 5.36499 8.2717 6.82874 7.38337 7.71706L7.10699 7.99345C6.62737 8.47307 6.58045 9.24679 7.0261 9.78685C7.45597 10.3078 7.9194 10.8266 8.42188 11.3291C8.92435 11.8316 9.44321 12.295 9.96413 12.7249C10.5042 13.1705 11.2779 13.1236 11.7575 12.644L12.0339 12.3676C12.9222 11.4793 14.386 11.5028 15.3033 12.4201L17.2964 14.4131C18.2137 15.3304 18.2371 16.7942 17.3488 17.6825L16.0621 18.9693Z"
                    fill="#FFF3E2"
                  />
                  <path
                    d="M14.6264 7.75071C14.3825 7.15553 14.0188 6.5979 13.5356 6.11463C13.0796 5.65865 12.5574 5.30918 11.9999 5.06622"
                    stroke="#FFF3E2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.9999 1.66341C13.3346 2.14691 14.5868 2.92365 15.6568 3.99364C16.7536 5.09049 17.5423 6.37883 18.0229 7.75113"
                    stroke="#FFF3E2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {loc.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation - Only visible on mobile */}
      {isMobile && (
        <div
          className="mt-6 flex justify-center items-center gap-4 md:hidden"
          style={{ height: 60, flexShrink: 0 }}
        >
          {/* Left button */}
          <div className="w-[48px] h-[48px] flex justify-center items-center">
            <button onClick={handlePrev}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                className="w-[48px] h-[48px]"
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
                />
                <path
                  d="M28.6364 19.0908C27.0779 22.1704 25.4245 27.9546 17.7273 29.9999"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
                <path
                  d="M19.2727 30.0002L40.9091 30.0002"
                  stroke="#FFF3E2"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          {/* Right button */}
          <div className="w-[48px] h-[48px] flex justify-center items-center">
            <button onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                fill="none"
                className="w-[48px] h-[48px]"
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
      )}
    </div>
  );
}
