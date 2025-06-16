// src/lib/withCors.ts
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN =
  process.env.NEXT_PUBLIC_BASE_URL || "https://linkpoll.vercel.app";

export function withCors(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest) => {
    const origin = req.headers.get("origin");

    // OPTIONS 요청은 미리 허용
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (!origin || origin !== ALLOWED_ORIGIN) {
      return new NextResponse("Forbidden: Invalid origin", { status: 403 });
    }

    const res = await handler(req);
    res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    return res;
  };
}
