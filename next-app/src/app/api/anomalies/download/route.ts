import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), "..", "ANOMALIES.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ANOMALIES.md"',
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
