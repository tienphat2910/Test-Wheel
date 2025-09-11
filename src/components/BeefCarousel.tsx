"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const cards = [
  {
    image: "/assets/diem-than-bo.jpg",
    title: "Diềm Thăn Bò",
    price: "(Trị giá 99.000 VND)",
    desc1:
      "Thớ thịt mềm xen gân giòn, sần sật đầy lôi cuốn, để lại hậu vị ngọt tự nhiên.",
    desc2: "⏱ Nhúng 10 giây để giữ trọn độ giòn dai và vị ngọt nguyên bản."
  },
  {
    image: "/assets/thit-vai-bo.jpg",
    title: "Thịt Vai Bò",
    price: "(Trị giá 89.000 VND)",
    desc1:
      "Thớ thịt hồng hào, săn chắc, giữ nguyên chất ngọt nguyên bản của bò tươi.",
    desc2: "⏱ Nhúng 10 giây để đạt độ chín vừa, mềm mà vẫn chắc thớ."
  },
  {
    image: "/assets/de-suon.jpg",
    title: "Dẻ Sườn",
    price: "(Trị giá 89.000 VND)",
    desc1:
      "Thịt chắc đan xen mỡ mềm, ngọt béo đậm đà, dậy hương khi vừa nhúng nước lẩu.",
    desc2: "⏱ Nhúng 13 giây để đạt độ mềm béo tròn vị, thơm đậm khó quên."
  },
  {
    image: "/assets/gu-hoa.jpg",
    title: "Gù Hoa",
    price: "(Trị giá 99.000 VND)",
    desc1:
      "Phần thịt cực hiếm, vân mỡ trắng mịn, béo thanh quyện nạc ngọt, mang đến trải nghiệm tinh tuyển khó tìm.",
    desc2: "⏱ Nhúng 10 giây để mỡ tan nhẹ, hòa quyện trọn hương vị độc bản."
  },
  {
    image: "/assets/than-dau-rong.jpg",
    title: "Thăn Đầu Rồng",
    price: "(Trị giá 99.000 VND)",
    desc1:
      "Hiếm có với tỷ lệ nạc - mỡ cân bằng hoàn hảo, thịt mềm mọng, đậm đà chuẩn gu sành.",
    desc2: "⏱ Nhúng 10 giây để chín tái, lan tỏa vị béo tinh tế."
  }
];

export default function BeefCarousel() {
  const [centeredIdx, setCenteredIdx] = useState(2); // index 2 là card giữa
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const total = cards.length;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Đảm bảo centeredIdx luôn là 0 trên mobile để hiển thị đúng 3 item
  useEffect(() => {
    if (width < 768 && centeredIdx !== 0) {
      setCenteredIdx(0);
    }
    if (width >= 768 && centeredIdx === 0) {
      setCenteredIdx(2);
    }
  }, [width]);

  // Tính vị trí tương đối của từng card so với center (có loop)
  const getRelativeIndex = (idx: number) => {
    let diff = idx - centeredIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Hiệu ứng slide
  const getStyle = (relIdx: number) => {
    let cardWidth = 240; // default mobile
    if (width >= 1024) cardWidth = 390;
    else if (width >= 768) cardWidth = 300;
    const baseTranslate = width < 768 ? cardWidth * 0.8 : 420;
    let scale = 0.8;
    let zIndex = 1;
    let opacity = 0.5;
    let display = "block";
    let translateX = relIdx * baseTranslate;
    if (width >= 1024) {
      if (relIdx === -2) translateX = -780;
      if (relIdx === 2) translateX = 780;
    }
    if (Math.abs(relIdx) > 2) {
      display = "none";
    }
    if (relIdx === 0) {
      scale = 1.15;
      zIndex = 3;
      opacity = 1;
    } else if (Math.abs(relIdx) === 1) {
      scale = 0.95;
      zIndex = 2;
      opacity = 0.8;
    } else if (Math.abs(relIdx) === 2) {
      scale = 0.85;
      zIndex = 1;
      opacity = 0.6;
    }
    return {
      baseTranslate,
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 400ms cubic-bezier(0.4,0,0.2,1)",
      display
    };
  };

  const prevSlide = () => {
    setCenteredIdx((prev) => (prev - 1 + total) % total);
  };
  const nextSlide = () => {
    setCenteredIdx((prev) => (prev + 1) % total);
  };

  // Swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let isSwiped = false;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isSwiped = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (width < 768 && !isSwiped) {
        const diff = e.touches[0].clientX - startX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) nextSlide();
          else prevSlide();
          isSwiped = true;
        }
      }
    };
    const handleTouchEnd = () => {
      startX = 0;
      isSwiped = false;
    };
    const carousel = document.getElementById("beef-carousel-touch");
    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchmove", handleTouchMove);
      carousel.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [width]);

  return (
    <div
      id="beef-carousel-touch"
      className="relative flex flex-col items-center md:px-0 overflow-hidden justify-center"
      style={{
        width: "100%",
        maxWidth: "1920px",
        minHeight: "0"
      }}
    >
      <div
        className="w-full flex flex-col items-center md:w-[1920px] md:flex-shrink-0"
        style={{
          width: "100%",
          maxWidth: "100vw",
          minHeight: "0"
        }}
      >
        {/* Carousel */}
        <div
          className="w-full flex justify-center items-center relative"
          style={{
            minHeight: "100%",
            paddingTop: "40px",
            paddingBottom: "40px",
            height: width >= 768 ? 700 : 550 // 700px cho desktop, 550px cho mobile
          }}
        >
          {cards.map((item, idx) => {
            const relIdx = getRelativeIndex(idx);
            const style = getStyle(relIdx);
            return (
              <div
                key={idx}
                className="beef-carousel-item flex-shrink-0 w-[240px] md:w-[300px] lg:w-[390px] h-[420px] md:h-[420px] lg:h-[580px] bg-white rounded-[30px] border-2 border-[#FFF3E2] shadow-lg p-4 md:p-6 flex flex-col items-start overflow-hidden mx-auto absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) ${style.transform}`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  transition: style.transition,
                  display: style.display
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={390}
                  height={280}
                  className="w-full h-[180px] md:h-[240px] lg:h-[280px] object-cover rounded-[20px] mb-4"
                  loading="eager"
                  priority={idx === centeredIdx}
                />
                <h3 className="text-lg md:text-2xl font-bold text-left text-black leading-snug utm-centur">
                  {item.title} <br />
                  <span className="font-semibold">{item.price}</span>
                </h3>
                <p className="text-sm md:text-lg text-black text-left mt-2 leading-relaxed kelson">
                  {item.desc1}
                </p>
                <p className="text-sm md:text-lg text-black text-left mt-2 leading-relaxed kelson">
                  {item.desc2}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div
          className="mt-10 flex justify-center items-center gap-4"
          style={{ height: "60px", flexShrink: 0 }}
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
