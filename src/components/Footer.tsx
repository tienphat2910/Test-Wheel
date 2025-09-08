"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-white pt-10 pb-4 px-4 md:px-0"
      style={{
        flexShrink: 0,
        background: `
          linear-gradient(
            180deg,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.86) 23.56%,
            #000 100%
          ),
          url('/assets/banner-rule-mobile.png') lightgray 0px -829.327px / 101.042% 314.851% no-repeat
        `
      }}
    >
      <style>
        {`
          @media (max-width: 767px) {
            footer {
              background:
                linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.49) 18.07%, #000 76.72%),
                url('/assets/banner-rule-mobile.png') lightgray -229.936px 0px / 206.947% 91.777% no-repeat !important;
              flex-shrink: 0 !important;
            }
            .footer-info-mobile {
              width: 100% !important;
              max-width: 100% !important;
            }
            .footer-social-mobile {
              justify-content: flex-start !important;
            }
            .footer-fanpage-mobile {
              justify-content: center !important;
              display: flex !important;
              width: 100%;
            }
          }
          @media (min-width: 768px) {
            .footer-info-mobile {
              max-width: 320px !important;
            }
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src="/assets/logo-tianlong.png"
            alt="Tian Long Logo"
            className="mb-2"
            style={{
              width: "136px",
              height: "69px",
              flexShrink: 0,
              aspectRatio: "136/69",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Description */}
        <div className="text-center text-[14px] md:text-[16px] text-white max-w-2xl mb-6 leading-relaxed kelson">
          Tian Long – Hệ thống Lẩu Bò Tươi Triều Châu với tuyên ngôn “Ăn Tươi –
          Sống Sành”, nâng tầm trải nghiệm: 100% bò tươi tuyệt đối trong hương
          vị, tinh tuyển trong chế biến và khác biệt trong cách tận hưởng.
          <br />
          <br />
          Tian Long không chỉ là nơi thưởng thức lẩu bò Triều Châu, còn là hành
          trình khẳng định gu vị: Ăn Tươi để giữ trọn hương vị nguyên bản, Sống
          Sành để nâng tầm phong cách.
        </div>

        {/* Line */}
        <div className="w-full border-t border-[#FFF] opacity-40 my-4" />

        {/* Info + Social + Fanpage */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Info */}
          <div className="footer-info-mobile flex-1 text-xs md:text-sm leading-relaxed break-words whitespace-pre-line kelson">
            <div className="font-bold mb-2">
              CHI NHÁNH CÔNG TY CP TẦM NHÌN QUỐC TẾ ALADDIN
            </div>
            <div className="mb-2 block md:hidden">
              - Địa chỉ: Số 43-45 Nguyễn Thị Thập KDC Him Lam, Phường Tân Hưng,
              Thành phố Hồ Chí Minh, Việt Nam
            </div>
            <div className="mb-2 hidden md:block">
              - Địa chỉ: Số 43-45 Nguyễn Thị Thập KDC Him Lam, <br /> Phường Tân
              Hưng, Thành phố Hồ Chí Minh, Việt Nam
            </div>
            <div className="mb-2 block md:hidden">
              - Mã số thuế: 0107742477-001, do Phòng ĐKKD - Sở KH&ĐT TP. Hà Nội
              cấp
            </div>
            <div className="mb-2 hidden md:block">
              - Mã số thuế: 0107742477-001,
              <br />
              do Phòng ĐKKD - Sở KH&ĐT TP. Hà Nội cấp
            </div>
          </div>
          {/* Social icons */}
          <div className="flex flex-row items-start gap-6 my-4 md:my-0 flex-shrink-0 self-start footer-social-mobile justify-start md:justify-center md:self-center">
            {/* Globe icon */}
            <a
              href="https://tianlong.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5C1B] rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Website"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_355_367)">
                  <path
                    d="M13.3662 6.24989C12.7068 3.18739 11.3006 1.24989 9.99995 1.24989C8.69933 1.24989 7.29308 3.18739 6.63371 6.24989H13.3662ZM6.24995 9.99989C6.2498 10.836 6.30555 11.6712 6.41683 12.4999H13.5831C13.6944 11.6712 13.7501 10.836 13.75 9.99989C13.7501 9.16377 13.6944 8.32858 13.5831 7.49989H6.41683C6.30555 8.32858 6.2498 9.16377 6.24995 9.99989ZM6.63371 13.7499C7.29308 16.8124 8.69933 18.7499 9.99995 18.7499C11.3006 18.7499 12.7068 16.8124 13.3662 13.7499H6.63371ZM14.6462 6.24989H18.5837C17.9921 4.90349 17.0932 3.71448 15.959 2.77823C14.8249 1.84197 13.4872 1.18453 12.0531 0.858643C13.2387 1.90177 14.1687 3.83052 14.6462 6.24989ZM19.0331 7.49989H14.8456C14.9487 8.32923 15.0002 9.16417 15 9.99989C15 10.8356 14.9483 11.6706 14.845 12.4999H19.0325C19.4882 10.8644 19.4889 9.1354 19.0331 7.49989ZM12.0531 19.1411C13.4874 18.8154 14.8254 18.1581 15.9597 17.2218C17.0941 16.2855 17.9932 15.0964 18.585 13.7499H14.6475C14.1687 16.1693 13.2387 18.098 12.0531 19.1411ZM5.3537 13.7499H1.4162C2.00795 15.0964 2.90706 16.2855 4.04141 17.2218C5.17576 18.1581 6.51377 18.8154 7.94808 19.1411C6.7612 18.098 5.8312 16.1693 5.3537 13.7499ZM7.94683 0.858643C6.51252 1.18436 5.17451 1.84172 4.04016 2.77798C2.90581 3.71424 2.0067 4.90335 1.41495 6.24989H5.35245C5.8312 3.83052 6.7612 1.90177 7.94683 0.858643ZM4.99995 9.99989C4.99987 9.16416 5.05164 8.32922 5.15495 7.49989H0.967455C0.511662 9.1354 0.511662 10.8644 0.967455 12.4999H5.15495C5.05164 11.6706 4.99987 10.8356 4.99995 9.99989Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_355_367">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {/* Phone icon */}
            <a
              href="tel:1900636886"
              className="bg-[#FF5C1B] rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Phone"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M13.7567 12C13.4865 11.7297 13.027 11.7297 12.7567 12L11.1892 13.5675C10.4595 14.2973 8.8108 13.8108 7.48648 12.4865C6.16215 11.1621 5.67567 9.51348 6.4054 8.78375L7.97296 7.21618C8.24323 6.94591 8.24323 6.48645 7.97296 6.21618L4.37837 2.62159C4.1081 2.35132 3.64864 2.35132 3.37837 2.62159L2.32432 3.67564C0.216207 5.78375 1.62161 10.6216 5.48648 14.4865C9.35134 18.3513 14.1892 19.7838 16.2973 17.6486L17.3513 16.5946C17.6216 16.3243 17.6216 15.8648 17.3513 15.5946L13.7567 12ZM10.0811 1.35132C9.72972 1.32429 9.45945 1.62159 9.48648 1.99997C9.5135 2.27024 9.78378 2.48645 10.054 2.51348C14.054 2.78375 17.2432 5.99997 17.5135 9.99997C17.5405 10.2973 17.7838 10.5405 18.0811 10.5405C18.4054 10.5405 18.6757 10.2702 18.6486 9.91889C18.3513 5.32429 14.6757 1.64861 10.0811 1.35132Z"
                  fill="white"
                />
                <path
                  d="M10.027 5.35137C12.4595 5.59461 14.4054 7.54056 14.6486 10C14.6757 10.2973 14.9189 10.5135 15.2162 10.5135C15.5405 10.5135 15.8108 10.2162 15.7838 9.89191C15.4865 6.89191 13.1081 4.4865 10.1081 4.18921C9.72973 4.16218 9.4054 4.51353 9.51351 4.91894C9.56756 5.18921 9.78378 5.32434 10.027 5.35137Z"
                  fill="white"
                />
              </svg>
            </a>
            {/* Facebook icon */}
            <a
              href="https://www.facebook.com/tianlong.laubotuoitrieuchau"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5C1B] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#FF5C1B] transition"
              aria-label="Facebook"
            >
              <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="20" fill="#FF5C1B" />
                <path
                  d="M21.1625 21.6122V28.5714H17.8319V21.6122H15.0649V18.7904H17.8319V17.7637C17.8319 13.9521 19.4908 11.948 23.0008 11.948C24.0768 11.948 24.3458 12.114 24.9351 12.2492V15.0403C24.2754 14.9296 24.0896 14.8682 23.4043 14.8682C22.5908 14.8682 22.1553 15.0895 21.7582 15.526C21.3611 15.9624 21.1625 16.7186 21.1625 17.8006V18.7965H24.9351L23.9231 21.6183H21.1625V21.6122Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          {/* Fanpage card custom với Follow & Share */}
          <div className="flex-shrink-0 relative w-[370px] h-[182px] rounded-lg overflow-hidden shadow-lg border border-[#FFF3E2] footer-fanpage-mobile md:justify-start">
            <img
              src="/assets/fanpage-card.png"
              alt="Fanpage"
              className="w-full h-full object-cover"
            />

            {/* Overlay: nút theo dõi và chia sẻ */}
            <div
              className="absolute left-0 right-0 bottom-0 flex flex-row items-center px-2 py-1 gap-2 justify-between"
              style={{ height: 38 }}
            >
              {/* Nút theo dõi trang */}
              <a
                href="https://www.facebook.com/tianlong.laubotuoitrieuchau"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                style={{
                  width: 110,
                  height: 24,
                  flexShrink: 0,
                  borderRadius: 2,
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.04)",
                  border: "1px solid #E4E6EB",
                  textDecoration: "none"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="mr-1"
                >
                  <g clipPath="url(#clip0_355_308)">
                    <path
                      d="M14 7C14 3.13402 10.866 8.58307e-06 7 8.58307e-06C3.13401 8.58307e-06 0 3.13402 0 7C0 10.2829 2.26002 13.0374 5.30896 13.7939V9.13909H3.86551V7H5.30896V6.07827C5.30896 3.6957 6.38719 2.59138 8.72631 2.59138C9.16977 2.59138 9.93498 2.67832 10.248 2.76529V4.7044C10.0828 4.68701 9.79585 4.6783 9.43933 4.6783C8.29152 4.6783 7.84803 5.11308 7.84803 6.2435V7H10.1345L9.7417 9.13909H7.84803V13.9487C11.314 13.5301 14 10.5789 14 7Z"
                      fill="#0866FF"
                    />
                    <path
                      d="M9.74167 9.13909L10.1345 7.00001H7.84803V6.24347C7.84803 5.11306 8.29149 4.6783 9.43929 4.6783C9.79582 4.6783 10.0828 4.68698 10.248 4.70437V2.76529C9.93495 2.67832 9.16974 2.59135 8.72628 2.59135C6.38719 2.59135 5.30893 3.6957 5.30893 6.07827V7.00001H3.86548V9.13909H5.30893V13.7939C5.85054 13.9282 6.41684 14 6.99996 14C7.28708 14 7.56999 13.9823 7.84803 13.9487V9.13909H9.74167Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_355_308">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className="kelson text-black"
                  style={{
                    flexShrink: 0,
                    color: "#000",
                    fontSize: 12
                  }}
                >
                  Theo dõi trang
                </span>
              </a>
              {/* Nút chia sẻ */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/tianlong.laubotuoitrieuchau",
                    "_blank"
                  )
                }
                className="flex items-center justify-center cursor-pointer"
                style={{
                  width: 90,
                  height: 24,
                  flexShrink: 0,
                  borderRadius: 2,
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.04)",
                  border: "1px solid #E4E6EB",
                  color: "#050505",
                  fontWeight: 600,
                  fontSize: 13,
                  fontFamily: "inherit"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="14"
                  viewBox="0 0 17 14"
                  fill="none"
                >
                  <path
                    d="M10.2 13.0725V9.24C5.474 9.24 2.363 10.7275 0 14C0.952 9.3275 3.587 4.6725 10.2 3.7275V0L17 6.5275L10.2 13.0725Z"
                    fill="black"
                  />
                </svg>
                <span
                  className="kelson text-black"
                  style={{
                    flexShrink: 0,
                    color: "#000",
                    fontSize: 12
                  }}
                >
                  Chia sẻ
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full text-center text-[14px] text-white mt-8 kelson">
          Copyright © TIAN LONG. All Rights Reserved. Designed by{" "}
          <a
            href="https://braney.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-none hover:text-yellow-400"
          >
            Braney
          </a>
        </div>
      </div>
    </footer>
  );
}
