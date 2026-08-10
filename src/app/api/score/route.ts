import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { ChallengeNotFoundError, scoreSubmission } from "@/features/scoring";

export async function POST(request: Request) {
  try {
    return NextResponse.json(await scoreSubmission(await request.json()));
  } catch (error) {
    const status = error instanceof ZodError ? 400 : error instanceof ChallengeNotFoundError ? 404 : 503;
    return NextResponse.json(
      {
        message:
          status === 400
            ? "That submission could not be read."
            : status === 404
              ? "That challenge does not exist."
              : "Scoring is temporarily unavailable.",
      },
      { status },
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
