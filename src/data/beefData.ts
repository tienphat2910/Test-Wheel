interface BeefData {
  title: string[];
  description: string[];
  image: string;
}

const beefData: BeefData[] = [
  {
    title: ["Diềm Thăn Bò", "(Trị giá 99.000 VND)"],
    description: [
      "Thớ thịt mềm xen gân giòn, sần sật đầy lôi cuốn, để lại hậu vị ngọt tự nhiên.",
      "⏱ Nhúng 10 giây để giữ trọn độ giòn dai và vị ngọt nguyên bản."
    ],
    image: "/assets/diem-than-bo.jpg"
  },
  {
    title: ["Thịt Vai Bò", "(Trị giá 89.000 VND)"],
    description: [
      "Thớ thịt hồng hào, săn chắc, giữ nguyên chất ngọt nguyên bản của bò tươi.",
      "⏱ Nhúng 10 giây để đạt độ chín vừa, mềm mà vẫn chắc thớ."
    ],
    image: "/assets/thit-vai-bo.jpg"
  },
  {
    title: ["Dẻ Sườn", "(Trị giá 89.000 VND)"],
    description: [
      "Thịt chắc đan xen mỡ mềm, ngọt béo đậm đà, dậy hương khi vừa nhúng nước lẩu.",
      "⏱ Nhúng 13 giây để đạt độ mềm béo tròn vị, thơm đậm khó quên."
    ],
    image: "/assets/de-suon.jpg"
  },
  {
    title: ["Gù Hoa", "(Trị giá 99.000 VND)"],
    description: [
      "Phần thịt cực hiếm, vân mỡ trắng mịn, béo thanh quyện nạc ngọt, mang đến trải nghiệm tinh tuyển khó tìm.",
      "⏱ Nhúng 10 giây để mỡ tan nhẹ, hòa quyện trọn hương vị độc bản."
    ],
    image: "/assets/gu-hoa.jpg"
  },
  {
    title: ["Thăn Đầu Rồng", "(Trị giá 99.000 VND)"],
    description: [
      "Hiếm có với tỷ lệ nạc - mỡ cân bằng hoàn hảo, thịt mềm mọng, đậm đà chuẩn gu sành.",
      "⏱ Nhúng 10 giây để chín tái, lan tỏa vị béo tinh tế."
    ],
    image: "/assets/than-dau-rong.jpg"
  }
];

export default beefData;
