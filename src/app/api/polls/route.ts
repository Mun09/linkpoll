// app/api/polls/route.ts

import { NextRequest, NextResponse } from "next/server";

let polls: any[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, options } = body;

  const newPoll = {
    id: String(polls.length),
    title,
    options: options.map((text: string) => ({ text, votes: 0 })),
    createdAt: new Date(),
    voters: [],
  };

  polls.push(newPoll);

  return NextResponse.json({ id: newPoll.id }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(polls);
}
