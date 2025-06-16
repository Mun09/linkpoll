// app/api/polls/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase";

// GET: 특정 ID의 투표 조회
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const docSnap = await adminDb.collection("polls").doc(id).get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json(
      { id: docSnap.id, ...docSnap.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json(
      { error: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}
