"use client";
import React, { useState } from "react";

export type PrizeData = {
  option: string;
  price: number;
  description: string;
  image: string;
};

type PrizePopupProps = {
  open: boolean;
  data: PrizeData | null;
  onClose?: () => void;
  onClaim?: () => void;
};

function generateCode(option: string): string {
  // Lấy ký tự đầu của từng từ trong tên option (chỉ lấy chữ cái đầu, không dấu)
  const initials = option
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  // Random 3 số cuối
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `TIANLONG${initials}${randomNum}`;
}

export default function PrizePopup({
  open,
  data,
  onClose,
  onClaim
}: PrizePopupProps) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Xác định Android
  const isAndroid =
    typeof window !== "undefined" &&
    /android/i.test(window.navigator.userAgent);

  // Kiểm tra clipboard API có thực sự khả dụng trên Android
  function canClipboardWork() {
    return (
      typeof window !== "undefined" &&
      !!navigator.clipboard &&
      !/FBAN|FBAV|Instagram|Zalo/i.test(window.navigator.userAgent)
    );
  }

  if (!open || !data) return null;

  const handleClaim = async () => {
    // Tracking GA4: Nhận mã
    if (typeof window !== "undefined") {
      // Use type assertion for window.gtag and window.dataLayer
      const win = window as Window & {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: object[];
      };
      if (typeof win.gtag === "function") {
        win.gtag("event", "claim_code_click", {
          event_category: "prize",
          event_label: "Nhận mã"
        });
      } else if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: "claim_code_click",
          event_category: "prize",
          event_label: "Nhận mã"
        });
      }
    }

    const code = generateCode(data.option);

    // Chỉ hiện thông báo copy trên Android, còn lại thì không hiện gì
    if (isAndroid) {
      let copied = false;
      if (canClipboardWork()) {
        try {
          await navigator.clipboard.writeText(code);
          setCopyStatus("Đã copy mã vào clipboard!");
          copied = true;
        } catch {
          setCopyStatus(
            "Không thể tự động copy, vui lòng copy thủ công mã bên dưới."
          );
        }
      } else {
        setCopyStatus(
          "Không thể tự động copy, vui lòng copy thủ công mã bên dưới."
        );
      }
      if (copied) {
        setTimeout(() => {
          window.open(
            `https://www.messenger.com/t/xyz.63631?ref=${encodeURIComponent(
              code
            )}`,
            "_blank"
          );
        }, 600);
      } else {
        window.open(
          `https://www.messenger.com/t/xyz.63631?ref=${encodeURIComponent(
            code
          )}`,
          "_blank"
        );
      }
    } else {
      // Web/iOS: chỉ copy, không hiện thông báo, không hiện code
      if (typeof window !== "undefined" && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(code);
        } catch {}
      }
      window.open(
        `https://www.messenger.com/t/xyz.63631?ref=${encodeURIComponent(code)}`,
        "_blank"
      );
    }

    if (onClaim) onClaim();
  };

  // Nút sao chép riêng cho Android
  const handleCopyOnly = async () => {
    const code = generateCode(data.option);
    if (canClipboardWork()) {
      try {
        await navigator.clipboard.writeText(code);
        setCopyStatus("Đã copy mã vào clipboard!");
      } catch {
        setCopyStatus(
          "Không thể tự động copy, vui lòng copy thủ công mã bên dưới."
        );
      }
    } else {
      setCopyStatus(
        "Không thể tự động copy, vui lòng copy thủ công mã bên dưới."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay phủ toàn bộ trang */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: 0.8
        }}
      />
      <div className="relative z-10 flex items-center justify-center">
        <div
          className="flex flex-col items-center border border-[#FFF3E2] bg-[#FFF3E2] relative"
          style={{
            width: "398px",
            maxWidth: "95vw",
            borderRadius: 40,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
            pointerEvents: "auto"
          }}
        >
          {/* Responsive width for desktop */}
          <style>
            {`
            @media (min-width: 768px) {
              .prize-popup-container {
                width: 560px !important;
              }
            }
          `}
          </style>
          <div className="prize-popup-container w-full flex flex-col items-center px-6 pt-8 pb-0">
            {/* Title */}
            <div className="text-center text-black text-[20px] md:text-[26px] font-bold mb-2 utm-centur">
              Chúc mừng Đồng Gu <br /> đã nhận được
            </div>
            {/* Option */}
            <div
              className="text-center font-voltra text-[20px] md:text-[25px] font-bold mb-1"
              style={{
                background:
                  "linear-gradient(180deg, #8F1713 0%, #CF3A05 114.44%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text" // cho các trình duyệt hỗ trợ chuẩn
              }}
            >
              1 Dĩa {data.option}
            </div>

            {/* Price */}
            <div
              className="text-center font-bold text-[14px] md:text-[20px] mb-3 font-voltra"
              style={{
                background:
                  "linear-gradient(180deg, #8F1713 0%, #CF3A05 114.44%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text" // hỗ trợ trình duyệt khác
              }}
            >
              Trị giá {data.price.toLocaleString()} VNĐ
            </div>
          </div>
          {/* Image full width container, giữ height */}
          <div className="w-full flex justify-center overflow-hidden">
            <img
              src={data.image}
              alt={data.option}
              className="w-full h-[200px] md:h-[210px] object-cover"
              style={{ background: "#fff" }}
            />
          </div>

          <div className="prize-popup-container w-full flex flex-col items-center px-6 pb-0">
            {/* Description */}
            <div className="w-[350px] text-center text-black text-[16px] md:text-[20px] utm-centur mb-6 px-2 break-words">
              {data.description}
            </div>
          </div>
          {/* Button group */}
          <div className="w-full flex flex-row">
            <button
              onClick={handleClaim}
              className="flex-1 h-[56px] text-white flex items-center justify-center font-voltra"
              style={{
                fontSize: isAndroid ? 15 : 18,
                borderRadius: isAndroid ? "0 0 0 40px" : "0 0 40px 40px",
                background:
                  "linear-gradient(180deg, #8F1713 0%, #CF3A05 114.44%)",
                letterSpacing: 1,
                cursor: "pointer"
              }}
            >
              NHẬN NGAY
            </button>
            {isAndroid && (
              <button
                onClick={handleCopyOnly}
                className="flex-1 h-[56px] text-[#CF3A05] flex items-center justify-center font-voltra border-l border-[#CF3A05]"
                style={{
                  fontSize: 15,
                  borderRadius: "0 0 40px 0",
                  background: "#fff",
                  letterSpacing: 1,
                  cursor: "pointer",
                  borderTop: "1px solid #CF3A05",
                  borderRight: "1px solid #CF3A05",
                  borderBottom: "1px solid #CF3A05"
                }}
              >
                SAO CHÉP MÃ
              </button>
            )}
          </div>
          {/* Copy status & code */}
          {isAndroid && copyStatus && (
            <div className="w-full flex flex-col items-center mt-2 mb-2">
              <span className="text-black text-sm md:text-base">
                {copyStatus}
              </span>
              <span
                className="font-mono text-black bg-[#f5f5f5] rounded px-2 py-1 mt-1 select-all"
                style={{ wordBreak: "break-all" }}
              >
                {generateCode(data.option)}
              </span>
            </div>
          )}
          {/* Icon đóng absolute dưới popup, căn giữa */}
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: "100%",
              marginTop: 16,
              width: 36,
              height: 36,
              cursor: "pointer"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx="18" cy="18" r="17.5" stroke="#FFF3E2" />
              <path
                d="M12 12L24 24"
                stroke="#FFF3E2"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M24 12L12 24"
                stroke="#FFF3E2"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
