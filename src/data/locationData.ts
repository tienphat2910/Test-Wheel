type Location = {
  title: string[];
  address: string;
  phone: string;
};

const LOCATIONS: Location[] = [
  {
    title: ["TIAN LONG", "Vincom Thảo Điền"],
    address: "Tầng L4, Vincom Mega Mall Thảo Điền, Phường An Khánh",
    phone: "0857 733 388"
  },
  {
    title: ["TIAN LONG", "Lê Văn Sỹ"],
    address: "Số 183 Lê Văn Sỹ, Phường Phú Nhuận",
    phone: "085 294 3388"
  },
  {
    title: ["TIAN LONG", "Nguyễn Thị Thập", "(Coming soon)"],
    address: "Số 541 Nguyễn Thị Thập, Phường Tân Hưng",
    phone: "085 294 2266"
  },
  {
    title: ["TIAN LONG", "Vincom Center", "Đồng Khởi"],
    address: "Tầng B3, Vincom Center Đồng Khởi, Phường Sài Gòn",
    phone: "085 334 2266"
  },
  {
    title: ["TIAN LONG", "Vincom Mega Mall", "Grand Park"],
    address: "Tầng 5 - Vincom Mega Mall Grand Park, Phường Long Bình",
    phone: "085 566 3388"
  }
];

export default LOCATIONS;
