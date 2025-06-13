// app/api/polls/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Poll } from "@/app/types/poll";

// POST: 새 투표 생성
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, options } = body;

    const newPoll: Poll = {
      title,
      options: options.map((text: string) => ({ text, votes: 0 })),
      createdAt: serverTimestamp(),
      voters: [],
    };

    const docRef = await addDoc(collection(db, "polls"), newPoll);

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

// GET: 전체 투표 목록 조회
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "polls"));
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
}
