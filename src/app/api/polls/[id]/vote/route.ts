import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase";
import { Poll } from "@/app/types/poll";

// POST: 특정 투표 항목에 투표
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { index, ip } = await request.json();

    if (typeof index !== "number" || !ip) {
      return NextResponse.json(
        { error: "Invalid input - requires index number and IP address" },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection("polls").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const pollData = docSnap.data()! as Poll;
    const { options, voters = [] } = pollData;

    // 중복 투표 방지
    // if (voters.includes(ip)) {
    //   return NextResponse.json(
    //     { error: "You have already voted" },
    //     { status: 403 }
    //   );
    // }

    // 투표 수 증가
    options[index].votes = (options[index].votes || 0) + 1;

    // 투표자 IP 추가
    voters.push(ip);

    // Firestore 문서 업데이트
    await docRef.update({ options, voters });

    return NextResponse.json(
      { id: docSnap.id, ...pollData, options, voters },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
