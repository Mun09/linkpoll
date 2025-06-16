// app/api/polls/route.ts

import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/app/lib/firebase";
import { Poll } from "@/app/types/poll";
import { withCors } from "@/app/lib/cors";

// POST: 새 투표 생성
async function createPoll(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, options } = body;

    const newPoll: Poll = {
      title,
      options,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      voters: [],
    };

    const docRef = await adminDb.collection("polls").add(newPoll);
    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

export const POST = withCors(createPoll);

// GET: 전체 투표 목록 조회
export const GET = withCors(async () => {
  try {
    const snapshot = await adminDb.collection("polls").limit(100).get();
    const polls = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(polls, { status: 200 });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
});

// OPTIONS 요청 처리
export const OPTIONS = withCors(() => new NextResponse(null, { status: 200 }));
