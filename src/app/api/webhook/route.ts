import { NextRequest, NextResponse } from "next/server";
import beefData from "@/data/beefData";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Map ký hiệu sang tên món và image (lấy title[0])
const beefMap: Record<string, { title: string; image: string }> = {
  DS: {
    title:
      beefData.find((item) => item.title.includes("Dẻ Sườn"))?.title[0] ||
      "Dẻ Sườn",
    image: beefData.find((item) => item.title.includes("Dẻ Sườn"))?.image || ""
  },
  TĐR: {
    title:
      beefData.find((item) => item.title.includes("Thăn Đầu Rồng"))?.title[0] ||
      "Thăn Đầu Rồng",
    image:
      beefData.find((item) => item.title.includes("Thăn Đầu Rồng"))?.image || ""
  },
  GH: {
    title:
      beefData.find((item) => item.title.includes("Gù Hoa"))?.title[0] ||
      "Gù Hoa",
    image: beefData.find((item) => item.title.includes("Gù Hoa"))?.image || ""
  },
  VT: {
    title:
      beefData.find((item) => item.title.includes("Thịt Vai Bò"))?.title[0] ||
      "Thịt Vai Bò",
    image:
      beefData.find((item) => item.title.includes("Thịt Vai Bò"))?.image || ""
  },
  DT: {
    title:
      beefData.find((item) => item.title.includes("Diềm Thăn"))?.title[0] ||
      "Diềm Thăn",
    image:
      beefData.find((item) => item.title.includes("Diềm Thăn"))?.image || ""
  }
};

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
            await sendBeefPrizeMessage(senderId, beef.title, beef.image);
            // KHÔNG trả lời gì nữa
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
        await sendMessage(senderId, "Tôi muốn đặt bàn ngay");
        continue;
      }
    }
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
