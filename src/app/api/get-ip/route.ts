// src/app/api/ip/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  console.log("IP Address:", ip);

  return NextResponse.json({ ip });
}
