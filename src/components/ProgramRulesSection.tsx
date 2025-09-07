"use client";
import React from "react";

const ProgramRulesSection = () => (
  <div className="flex justify-center mt-8 overflow-hidden overflow-x-hidden overflow-y-hidden">
    {/* Desktop */}
    <div className="hidden md:block relative w-[1419px] h-[482px] flex-shrink-0 mx-auto overflow-hidden">
      {/* SVG viền ngoài */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1419"
        height="482"
        viewBox="0 0 1419 482"
        fill="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        {/* ...SVG viền ngoài desktop... */}
        <mask id="path-1-inside-1_422_1531" fill="white">
          <path d="M1403.01 0C1403.27 8.7153 1410.28 15.7318 1419 15.9912V465.008C1410.12 465.272 1403 472.555 1403 481.5C1403 481.667 1403 481.834 1403.01 482H16.9912C16.9962 481.834 17 481.667 17 481.5C17 472.387 9.6127 465 0.5 465C0.332737 465 0.166066 465.003 0 465.008V15.9912C0.166075 15.9962 0.332727 16 0.5 16C9.44543 16 16.7269 8.88137 16.9912 0H1403.01Z" />
        </mask>
        <path
          d="M1403.01 0L1404.01 -0.0297516L1403.98 -1H1403.01V0ZM1419 15.9912H1420V15.0205L1419.03 14.9917L1419 15.9912ZM1419 465.008L1419.03 466.007L1420 465.978V465.008H1419ZM1403.01 482V483H1404.04L1404.01 481.97L1403.01 482ZM16.9912 482L15.9917 481.97L15.961 483H16.9912V482ZM0 465.008H-1V466.038L0.0297499 466.007L0 465.008ZM0 15.9912L0.0297516 14.9917L-1 14.961V15.9912H0ZM16.9912 0V-1H16.0205L15.9917 -0.0297516L16.9912 0ZM1403.01 0L1402.01 0.0297516C1402.28 9.274 1409.73 16.7156 1418.97 16.9908L1419 15.9912L1419.03 14.9917C1410.84 14.748 1404.25 8.1566 1404.01 -0.0297516L1403.01 0ZM1419 15.9912H1418V465.008H1419H1420V15.9912H1419ZM1419 465.008L1418.97 464.008C1409.55 464.289 1402 472.012 1402 481.5H1403H1404C1404 473.097 1410.69 466.256 1419.03 466.007L1419 465.008ZM1403 481.5H1402C1402 481.682 1402 481.86 1402.01 482.03L1403.01 482L1404.01 481.97C1404 481.808 1404 481.653 1404 481.5H1403ZM1403.01 482V481H16.9912V482V483H1403.01V482ZM16.9912 482L17.9908 482.03C17.9958 481.86 18 481.682 18 481.5H17H16C16 481.653 15.9965 481.808 15.9917 481.97L16.9912 482ZM17 481.5H18C18 471.835 10.165 464 0.5 464V465V466C9.06041 466 16 472.94 16 481.5H17ZM0.5 465V464C0.32135 464 0.144645 464.003 -0.0297499 464.008L0 465.008L0.0297499 466.007C0.187487 466.003 0.344123 466 0.5 466V465ZM0 465.008H1V15.9912H0H-1V465.008H0ZM0 15.9912L-0.0297516 16.9908C0.140067 16.9958 0.318121 17 0.5 17V16V15C0.347333 15 0.192084 14.9965 0.0297516 14.9917L0 15.9912ZM0.5 16V17C9.98785 17 17.7104 9.44985 17.9908 0.0297516L16.9912 0L15.9917 -0.0297516C15.7433 8.31289 8.903 15 0.5 15V16ZM16.9912 0V1H1403.01V0V-1H16.9912V0Z"
          fill="#FFF3E2"
          mask="url(#path-1-inside-1_422_1531)"
        />
      </svg>
      {/* SVG nền bên trong */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1408"
        height="470"
        viewBox="0 0 1408 470"
        fill="none"
        className="absolute top-1 left-0 right-0 mx-auto w-[calc(100%-22px)] max-w-[1408px] h-[470px] z-0"
      >
        <defs>
          <linearGradient
            id="paint0_linear_422_1532"
            x1="705.439"
            y1="0"
            x2="705.439"
            y2="537.891"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8F1713" />
            <stop offset="1" stopColor="#CF3A05" />
          </linearGradient>
        </defs>
        <mask id="path-1-inside-1_422_1532" fill="white">
          <path d="M1391.21 0C1391.47 8.49842 1398.42 15.341 1407.07 15.5938V453.431C1398.26 453.688 1391.2 460.79 1391.2 469.513C1391.2 469.676 1391.2 469.838 1391.21 470H16.8486C16.8535 469.838 16.8574 469.676 16.8574 469.513C16.8574 460.627 9.5321 453.423 0.496094 453.423C0.330175 453.423 0.16473 453.426 0 453.431V15.5938C0.164735 15.5986 0.330171 15.6016 0.496094 15.6016C9.36623 15.6015 16.5865 8.66022 16.8486 0H1391.21Z" />
        </mask>
        <path
          d="M1391.21 0C1391.47 8.49842 1398.42 15.341 1407.07 15.5938V453.431C1398.26 453.688 1391.2 460.79 1391.2 469.513C1391.2 469.676 1391.2 469.838 1391.21 470H16.8486C16.8535 469.838 16.8574 469.676 16.8574 469.513C16.8574 460.627 9.5321 453.423 0.496094 453.423C0.330175 453.423 0.16473 453.426 0 453.431V15.5938C0.164735 15.5986 0.330171 15.6016 0.496094 15.6016C9.36623 15.6015 16.5865 8.66022 16.8486 0H1391.21Z"
          fill="url(#paint0_linear_422_1532)"
        />
        <path
          d="M381.771 1.20538C382.832 6.81091 385.995 11.2016 390.005 12.8782V498.856C385.987 500.41 382.83 504.807 381.771 510.403H9.17188C8.11589 504.942 5.05159 500.414 0.938477 498.855V12.7513C4.95582 11.1969 8.11293 6.80075 9.17188 1.20538H381.771Z"
          fill="none"
        />
      </svg>
      {/* Nội dung ở đây */}
      <div className="absolute inset-0 z-20 flex flex-col p-10">
        {/* Div 1: Title + Nội dung thể lệ */}
        <div className="flex flex-col gap-2 mt-6">
          <div
            className="h-[30px] self-stretch text-left"
            style={{
              color: "#FFD8A7",
              fontFamily: '"FZ-SG ZT Voltra", sans-serif',
              fontSize: 20,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "32px",
              letterSpacing: "-1px"
            }}
          >
            Thể lệ chương trình
          </div>
          <div
            className="h-[96px] self-stretch kelson"
            style={{
              color: "#FFF3E2",
              fontSize: 18,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28px",
              whiteSpace: "pre-line"
            }}
          >
            • Gọi món “Vòng Xoay Bò Đặc Biệt” tại nhà hàng và quét QR trên tag
            để tham gia.
            {"\n"}• Vòng xoay hiển thị kết quả trúng 01 trong 05 phần bò tinh
            tuyển: Dẻ Sườn, Bắp Hoa, Thịt Vai Bò, Diềm Thăn Bò, Thăn Đầu Rồng.
            {"\n"}• Nhấn “Nhận ngay”, sau đó bấm “Gửi” trong Messenger để nhận
            thông tin phần quà tương ứng cùng hướng dẫn sử dụng ưu đãi.
          </div>
        </div>
        {/* Div 2: Điều khoản & điều kiện */}
        <div className="flex flex-col gap-2 mt-10">
          <div
            className="h-[30px] self-stretch text-left"
            style={{
              color: "#FFD8A7",
              fontFamily: '"FZ-SG ZT Voltra", sans-serif',
              fontSize: 20,
              fontWeight: 400,
              lineHeight: "32px",
              letterSpacing: "-1px"
            }}
          >
            Điều khoản & điều kiện
          </div>
          <div
            className="self-stretch kelson"
            style={{
              color: "#FFF3E2",
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "28px",
              whiteSpace: "pre-line"
            }}
          >
            • Áp dụng cho hóa đơn từ 500.000đ.
            {"\n"}• Đặt bàn trước qua fanpage để sử dụng mã.
            {"\n"}• Không áp dụng cùng Combo, Lễ Tết và các chương trình khuyến
            mãi khác.
            {"\n"}• Quà tặng không có giá trị quy đổi thành tiền mặt, áp dụng
            tối đa 01 phần/hóa đơn.
          </div>
        </div>
      </div>
    </div>
    {/* Mobile */}
    <div className="block md:hidden relative w-full max-w-[397px] min-h-[520px] flex-shrink-0 mx-auto overflow-hidden">
      {/* SVG viền ngoài */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="397"
        height="520"
        viewBox="0 0 397 520"
        fill="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        <path
          d="M396.2 11.6328C392.018 11.6328 388.672 6.9274 388.672 1.04564V4.36687e-07L8.2709 0V1.04564C8.2709 6.92739 4.92538 11.6328 0.743463 11.6328H9.77516e-06L0 508.367H0.743451C4.92537 508.367 8.2709 513.073 8.2709 518.954V520H388.672V518.954C388.672 513.073 392.018 508.367 396.2 508.367H396.943L396.943 11.6328H396.2ZM395.549 506.407C391.182 506.929 387.65 511.766 387.371 517.909H9.57194C9.29314 511.766 5.76175 506.929 1.39397 506.407L1.39398 13.4627C5.76176 13.0706 9.29314 8.10375 9.57194 1.96058L387.278 1.96058C387.65 8.10375 391.089 13.0706 395.456 13.4627L395.456 506.407H395.549Z"
          fill="#FFF3E2"
        />
      </svg>
      {/* SVG nền bên trong */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="391"
        height="511"
        viewBox="0 0 391 511"
        fill="none"
        className="absolute top-1 left-1 w-full h-[511px] z-0"
      >
        <path
          d="M381.771 1.20538C382.832 6.81091 385.995 11.2016 390.005 12.8782V498.856C385.987 500.41 382.83 504.807 381.771 510.403H9.17188C8.11589 504.942 5.05159 500.414 0.938477 498.855V12.7513C4.95582 11.1969 8.11293 6.80075 9.17188 1.20538H381.771Z"
          fill="url(#paint0_linear_619_148)"
          stroke="#FFF3E2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_619_148"
            x1="196"
            y1="0.705383"
            x2="196"
            y2="584.6"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8F1713" />
            <stop offset="1" stopColor="#CF3A05" />
          </linearGradient>
        </defs>
      </svg>
      {/* Nội dung mobile */}
      <div className="absolute inset-0 z-20 flex flex-col p-4 gap-6">
        {/* Thể lệ */}
        <div>
          <div
            className="flex w-full max-w-[95%] mx-auto flex-col justify-center items-center text-center font-voltra px-2"
            style={{
              color: "#FFD8A7",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: 400,
              lineHeight: "1.3",
              letterSpacing: "-0.8px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              height: "auto",
              minHeight: "26px"
            }}
          >
            Thể lệ chương trình
          </div>

          <div
            className="mt-2 self-stretch kelson"
            style={{
              color: "#FFF3E2",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "26px",
              whiteSpace: "pre-line"
            }}
          >
            • Gọi món “Vòng Xoay Bò Đặc Biệt” tại nhà hàng và quét QR trên tag
            để tham gia.
            {"\n"}• Vòng xoay hiển thị kết quả trúng 01 trong 05 phần bò tinh
            tuyển: Dẻ Sườn, Bắp Hoa, Thịt Vai Bò, Diềm Thăn Bò, Thăn Đầu Rồng.
            {"\n"}• Nhấn “Nhận ngay”, sau đó bấm “Gửi” trong Messenger để nhận
            thông tin phần quà tương ứng cùng hướng dẫn sử dụng ưu đãi.
          </div>
        </div>

        {/* Điều khoản */}
        <div>
          <div
            className="flex w-full max-w-[95%] mx-auto flex-col justify-center items-center text-center font-voltra px-2"
            style={{
              color: "#FFD8A7",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: 400,
              lineHeight: "1.3",
              letterSpacing: "-0.8px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              height: "auto",
              minHeight: "26px"
            }}
          >
            Điều khoản & điều kiện
          </div>
          <div
            className="mt-2 self-stretch kelson"
            style={{
              color: "#FFF3E2",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "26px",
              whiteSpace: "pre-line"
            }}
          >
            • Áp dụng cho hóa đơn từ 500.000đ.
            {"\n"}• Đặt bàn trước qua fanpage để sử dụng mã.
            {"\n"}• Không áp dụng cùng Combo, Lễ Tết và các chương trình khuyến
            mãi khác.
            {"\n"}• Quà tặng không có giá trị quy đổi thành tiền mặt, áp dụng
            tối đa 01 phần/hóa đơn.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProgramRulesSection;
