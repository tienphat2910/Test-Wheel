import { NextRequest, NextResponse } from "next/server";
// import beefData from "@/data/beefData";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Dữ liệu beef mới
const beefArray = [
  {
    title: "Diềm Thăn Bò - Trị giá 99.000 VND",
    image: "https://tianlong.vn/Upload/Products/091224091648.jpg"
  },
  {
    title: "Thịt Vai Bò - Trị giá 89.000 VND",
    image: "https://tianlong.vn/Upload/Products/071224120309.jpg"
  },
  {
    title: "Dẻ Sườn - Trị giá 89.000 VND",
    image: "https://tianlong.vn/Upload/Products/091224091754.jpg"
  },
  {
    title: "Gù Hoa - Trị giá 99.000 VND",
    image: "https://tianlong.vn/Upload/Products/091224091038.jpg"
  },
  {
    title: "Thăn Đầu Rồng - Trị giá 99.000 VND",
    image: "https://tianlong.vn/Upload/Products/091224091244.jpg"
  }
];

// Tạo map viết tắt từ tên món (lấy ký tự đầu của từng từ, viết hoa, không lấy chữ "-" và sau đó)
function getShortKey(title: string) {
  // Lấy phần trước dấu "-" nếu có
  const name = title.split("-")[0].trim();
  // Lấy ký tự đầu của từng từ
  return name
    .split(" ")
    .map((w) => w[0].toUpperCase())
    .join("");
}

const beefMap: Record<string, { title: string; image: string }> = {};
beefArray.forEach((item) => {
  const key = getShortKey(item.title);
  beefMap[key] = { title: item.title, image: item.image };
});

// Xác minh webhook (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse(null, { status: 403 });
  }
}

// Nhận & xử lý tin nhắn (POST)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const tasks: Promise<any>[] = [];

  if (body.object === "page") {
    for (const entry of body.entry) {
      if (!entry.messaging || !Array.isArray(entry.messaging)) continue;
      const event = entry.messaging[0];
      if (event && event.message && event.message.text) {
        const senderId = event.sender.id;
        const messageText = event.message.text.trim();
        // Kiểm tra mã hợp lệ PrizePopup (bắt đầu bằng TIANLONG, theo PrizePopup)
        const codeMatch = /^TIANLONG([A-ZĐ]+)(\d{3})$/i.exec(messageText);
        if (codeMatch) {
          let beefKey = codeMatch[1].toUpperCase();
          if (beefKey === "DS") beefKey = "DS";
          else if (beefKey === "TDR" || beefKey === "TĐR") beefKey = "TĐR";
          else if (beefKey === "GH") beefKey = "GH";
          else if (beefKey === "VT") beefKey = "VT";
          else if (beefKey === "DT") beefKey = "DT";
          const beef = beefMap[beefKey];
          if (beef) {
            tasks.push(sendBeefPrizeMessage(senderId, beef.title, beef.image));
            continue;
          }
        }
        // Nếu không hợp lệ thì không trả lời gì cả
      } else if (
        event &&
        event.postback &&
        event.postback.payload === "Tôi muốn đặt bàn ngay"
      ) {
        const senderId = event.sender.id;
        tasks.push(sendMessage(senderId, "Tôi muốn đặt bàn ngay"));
        continue;
      }
    }
    // Gửi tin nhắn ra nền, không chờ
    Promise.allSettled(tasks);
    return new NextResponse(null, { status: 200 });
  } else {
    return new NextResponse(null, { status: 404 });
  }
}

async function sendMessage(senderId: string, text: string) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: { text }
      })
    }
  );
}

async function sendBeefPrizeMessage(
  senderId: string,
  beefName: string,
  beefImage: string
) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: `Chúc mừng Đồng Gu đã nhận được món ${beefName} 🎉`,
                  buttons: [
                    {
                      type: "postback",
                      title: "Đặt bàn",
                      payload: "Tôi muốn đặt bàn ngay"
                    }
                  ],
                  image_url: beefImage,
                  subtitle:
                    "Nhấn đặt bàn để thưởng thức lẩu bò tươi Triều Châu tại Tian Long!"
                }
              ]
            }
          }
        }
      })
    }
  );
}
