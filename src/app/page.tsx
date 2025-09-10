"use client";
import { useState } from "react";
import WheelSpinner from "@components/WheelSpinner";
import ProgramRulesSection from "@components/ProgramRulesSection";
import BeefCarousel from "@components/BeefCarousel";
import LocationList from "@components/LocationList";
import Footer from "@/components/Footer";
import PrizePopup, { PrizeData } from "@components/PrizePopup";
import Image from "next/image";

export default function Home() {
  const [prizeResult, setPrizeResult] = useState<{
    resultIdx: number | null;
    data: PrizeData | null;
  }>({
    resultIdx: null,
    data: null
  });

  const handlePrizeResult = (
    resultIdx: number | null,
    data: PrizeData | null
  ) => {
    setPrizeResult({ resultIdx, data });
  };

  const handleClosePopup = () => {
    setPrizeResult({ resultIdx: null, data: null });
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="w-full relative overflow-hidden min-h-[80vh] md:min-h-0 md:h-auto bg-black">
        {/* Desktop */}
        <div className="hidden md:flex w-full relative flex-col items-center justify-center overflow-hidden bg-black">
          <div
            className="relative flex flex-col items-center w-full mb-5"
            style={{
              width: "100vw",
              maxWidth: "100vw",
              height: "auto",
              aspectRatio: "64/55",
              background:
                "url('/assets/banner-desktop.png') lightgray 50% 0% / 100vw auto no-repeat"
            }}
          >
            {/* Logo gần text, không sát phải */}
            <div className="absolute top-[12%] right-[15%] z-20 block">
              <Image
                src="/assets/logo-tianlong.png"
                alt="Tianlong Logo"
                width={200}
                height={100}
                className="w-[20%] h-[14%] min-w-[125px] min-h-[60px] aspect-[79/40] flex-shrink-0"
                style={{ opacity: 1, filter: "none" }}
              />
            </div>
            {/* WheelSpinner nằm chồng trên banner */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 z-30 flex flex-col items-center justify-end"
              style={{ width: 360, height: 360, minWidth: 360, minHeight: 360 }}
            >
              <WheelSpinner onPrizeResult={handlePrizeResult} />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="block md:hidden w-full bg-black relative h-full">
          <div className="relative w-full min-h-screen mx-auto bg-black">
            {/* Background banner */}
            <Image
              src="/assets/banner.png"
              alt="Banner Mobile"
              width={600}
              height={400}
              className="w-full h-auto object-cover object-no-repeat absolute inset-0"
            />

            {/* Overlay content */}
            <div className="relative z-20 flex flex-col items-center w-full h-full gap-4">
              {/* Logo */}
              <Image
                src="/assets/logo-tianlong.png"
                alt="Tianlong Logo"
                width={90}
                height={60}
                className="w-[21%] h-auto min-w-[70px] max-w-[90px] mt-15"
                style={{ opacity: 1, filter: "none" }}
              />
              {/* Text */}
              <Image
                src="/assets/text-xoay-bo-dung-gu.png"
                alt="Xoay bò đúng gu"
                width={300}
                height={80}
                className="w-full max-w-[300px] h-auto mb-4"
              />
              {/* WheelSpinner */}
              <div className="w-full flex justify-center pt-50 mt-15 pb-0 mb-0">
                <WheelSpinner onPrizeResult={handlePrizeResult} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Đặt ProgramRulesSection trong một container có max-width và margin auto */}
      <div className="z-10 max-w-[1419px] mx-auto px-4 bg-black">
        <ProgramRulesSection />
      </div>
      <div
        className={`
          w-full
          flex flex-col items-center
          justify-center
          beef-carousel-bg
          py-8 md:py-16 lg:py-24
          bg-black
        `}
      >
        <style>
          {`
            .beef-carousel-bg {
              background: linear-gradient(
                  0deg,
                  rgba(0,0,0,0.60) 0%,
                  rgba(0,0,0,0.60) 100%
                ),
                url('/assets/banner-rule-mobile.png')
                  center center / cover no-repeat;
            }
            @media (min-width: 768px) {
              .beef-carousel-bg {
                background: url('/assets/banner-rule-desktop.png')
                  center center / cover no-repeat;
              }
            }
          `}
        </style>
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center w-full px-4 md:px-8 lg:px-0">
            <div
              className="
                text-center text-white
                w-full max-w-[396px] md:max-w-[900px] lg:max-w-[1200px]
                text-[13px] md:text-[20px] lg:text-[28px]
                leading-[22px] md:leading-[32px] lg:leading-[38px] kelson
              "
            >
              Điểm khác biệt của Tian Long nằm ở độ tươi tuyệt đối - 100% bò
              nhập mới mỗi sáng, thái tay ngay tại quầy, không cấp đông, không
              để qua đêm. Từ chuẩn mực ấy, bò úp ngược trở thành dấu ấn độc bản:
              nơi sự tươi ngon được thể hiện trọn vẹn qua từng lát cắt.
              <br />
              <br />
              Vòng Xoay Bò Đặc Biệt hội tụ 5 phần bò tinh tuyển: Dẻ Sườn, Bắp
              Hoa, Thịt Vai Bò, Diềm Thăn và Thăn Đầu Rồng. Dưới bàn tay điêu
              luyện của các sư phụ, từng lát cắt được căn chỉnh kỹ lưỡng, đúng
              thớ, đúng độ dày để giữ nguyên vị ngọt tinh hoa, biến mỗi vòng
              xoay thành một trải nghiệm vị giác độc bản dành riêng cho Đồng Gu.
            </div>
          </div>
          <div className="mt-8 md:mt-12 lg:mt-16 w-full flex justify-center max-w-[2206px] ">
            <div className="w-full max-w-[1980px] max-h-[800px] h-full px-2 md:px-0">
              <BeefCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Section mới: Hẹn gặp Đồng Gu tại */}
      <section className="w-full flex flex-col items-center mb-12 bg-black">
        <div className=" px-4 mt-12 mb-10">
          <h2
            className="text-center font-voltra uppercase"
            style={{
              color: "#FFD8A7",
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "normal"
            }}
          >
            <span className="md:text-[48px] text-[24px]">
              Hẹn gặp Đồng Gu tại
            </span>
          </h2>
        </div>
        <div className="w-full max-w-[1710px] px-4 md:px-0 bg-black">
          <LocationList />
        </div>
      </section>
      <div className="bg-black">
        <Footer />
      </div>

      {/* Prize Popup - overlay toàn bộ trang */}
      <PrizePopup
        open={prizeResult.resultIdx !== null}
        data={prizeResult.data}
        onClose={handleClosePopup}
        onClaim={handleClosePopup}
      />
    </div>
  );
}
