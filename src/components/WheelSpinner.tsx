"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import WHEEL_PRIZES from "@/data/wheelPrizes";
import type { PrizeData } from "@components/PrizePopup";

type WheelSpinnerProps = {
  onPrizeResult?: (resultIdx: number | null, data: PrizeData | null) => void;
};

export default function WheelSpinner({
  onPrizeResult
}: WheelSpinnerProps = {}) {
  const [isSpinning, setIsSpinning] = useState(false);
  // Bắt đầu lệch 36° để pointer (ở đáy) nằm đúng biên giữa "Gù hoa" và "Dẻ sườn"
  const [rotation, setRotation] = useState(36);
  const [_resultIdx, setResultIdx] = useState<number | null>(null); // renamed to _resultIdx to avoid unused warning
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    // Only apply on desktop
    const updateScale = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setDesktopScale(1 / window.devicePixelRatio);
      } else {
        setDesktopScale(1);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;

    // Tracking GA4: Nút quay
    if (typeof window !== "undefined") {
      const win = window as Window & {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: object[];
      };
      if (typeof win.gtag === "function") {
        win.gtag("event", "spin_wheel_click", {
          event_category: "wheel",
          event_label: "Nhấn để xoay"
        });
      } else if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: "spin_wheel_click",
          event_category: "wheel",
          event_label: "Nhấn để xoay"
        });
      }
    }

    setIsSpinning(true);
    setResultIdx(null);

    const randomSection = Math.floor(Math.random() * WHEEL_PRIZES.length);

    // Góc trung tâm mỗi section (0, 72, 144, 216, 288)
    const labelAngle = randomSection * (360 / WHEEL_PRIZES.length);

    // Pointer ở đáy (180°), nên tính offset từ label đến 180°
    const desiredOffset = (180 - labelAngle + 360) % 360;

    const currentNormalizedRotation = rotation % 360;
    const baseSpins = 360 * 10; // quay ít nhất 5 vòng
    const finalTargetRotation = baseSpins + desiredOffset;
    const actualSpinAmount = finalTargetRotation - currentNormalizedRotation;

    setRotation(rotation + actualSpinAmount);

    setTimeout(() => {
      setResultIdx(randomSection);
      setIsSpinning(false);
      // Truyền đúng data theo vị trí pointer (không đảo ngược index nữa)
      if (onPrizeResult) {
        onPrizeResult(randomSection, WHEEL_PRIZES[randomSection] as PrizeData);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Wheel - responsive and constrained for small screens */}
        <div
          className="flex-shrink-0
            md:w-[360px] md:h-auto
            /* Mobile custom size */
            block md:hidden w-[120vw] h-[120vw]
            "
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 15s cubic-bezier(0.23, 1, 0.32, 1)"
              : "none",
            cursor: isSpinning ? "default" : "pointer"
          }}
          onClick={() => !isSpinning && spinWheel()}
        >
          <Image
            src="/assets/wheel.png"
            alt="Spinning Wheel"
            width={1000}
            height={810}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* Wheel for desktop */}
        <div
          className="hidden md:block relative w-[360px] lg:w-[600px] xl:w-[807px] h-[360px] lg:h-[600px] xl:h-[807px] flex-shrink-0"
          style={{
            transform: `scale(${desktopScale}) rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 3s cubic-bezier(0.23, 1, 0.32, 1)"
              : "none",
            cursor: isSpinning ? "default" : "pointer"
          }}
          onClick={() => !isSpinning && spinWheel()}
        >
          <Image
            src="/assets/wheel.png"
            alt="Spinning Wheel"
            width={807}
            height={810}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        {/* Pointer - smaller on mobile */}
        <div
          className="absolute left-1/2 z-10"
          style={{
            bottom: 0,
            transform: "translateX(-50%)"
          }}
        >
          <svg
            className="w-[28px] sm:w-[36px] md:w-[41px] lg:w-[60px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 44"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: "drop-shadow(0 8px 6px rgba(0,0,0,0.6))" }}
          >
            <path
              d="M21.9257 19.1105L13.5118 3L5.09786 19.1105L2.26153 24.9645C-1.66812 33.1065 4.03622 42.7318 13.0998 43C13.2266 43 13.3692 43 13.4959 43C13.6227 43 13.7653 43 13.8921 43C22.9715 42.7318 28.6758 33.1065 24.7303 24.9645L21.9257 19.1105Z"
              fill="#CF3A05"
              stroke="#FFF3E2"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>

      {/* Button + Text */}
      <div className="mt-8 flex flex-col items-center w-[230px] md:w-[400px]">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`relative w-[230px] h-[40px] md:w-[400px] md:h-[76px] flex-shrink-0 flex items-center justify-center transition-transform duration-200 ${
            isSpinning
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
          aria-disabled={isSpinning}
        >
          {/* outer border SVG (scales to button) */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 231 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M230.066 5.01408C227.627 5.01408 225.676 2.98592 225.676 0.450704V0H5.32382V0.450704C5.32382 2.98592 3.37261 5.01408 0.933602 5.01408H0.5V34.9859H0.933602C3.37261 34.9859 5.32382 37.0141 5.32382 39.5493V40H225.676V39.5493C225.676 37.0141 227.627 34.9859 230.066 34.9859H230.5V5.01408H230.066ZM229.687 34.1408C227.14 34.3662 225.08 36.4507 224.917 39.0986H6.08263C5.92003 36.4507 3.86042 34.3662 1.313 34.1408V5.80282C3.86042 5.6338 5.92003 3.49296 6.08263 0.84507L224.863 0.84507C225.08 3.49296 227.085 5.6338 229.633 5.80282V34.1408H229.687Z"
              fill="#CF3A05"
            />
          </svg>

          {/* inner background SVG */}
          <svg
            className="absolute mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 227 36"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M221.671 0.140874V0.0281982H5.3292V0.140874C4.73299 2.56341 2.89018 4.42257 0.613772 5.04228H0.505371V30.7888H0.613772C2.94438 31.4085 4.73299 33.324 5.3292 35.6902V35.8029H221.671V35.6902C222.267 33.2676 224.11 31.4085 226.386 30.7888H226.495V5.09862H226.386C224.11 4.42257 222.267 2.56341 221.671 0.140874Z"
              fill="#FFF3E2"
            />
          </svg>

          {/* text centered (responsive) */}
          <span
            className="relative w-auto px-2 text-center select-none font-voltra font-[400] text-[#CF3A05] text-[18px] md:text-[32px] lg:text-[32px] whitespace-nowrap"
            style={{
              fontFamily: '"FZ-SG ZT Voltra", serif',
              fontFeatureSettings: '"clig" off, "liga" off',
              letterSpacing: 0,
              lineHeight: "1.1",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}
          >
            {isSpinning ? "Đang quay..." : "Nhấn để xoay"}
          </span>
        </button>

        {/* Đảm bảo text này luôn hiển thị, không bị che khi scale lớn */}
        <p className="kelson mt-4 text-center text-[14px] md:text-[28px] self-stretch md:self-auto md:w-[576px] z-40 relative px-2 py-1 rounded text-white">
          Nhận ngay 01 phần bò tươi tinh tuyển cho lần thưởng thức kế tiếp
        </p>
      </div>
    </div>
  );
}
