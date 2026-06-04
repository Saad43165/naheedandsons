import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { passcode, key } = await request.json();
    const serverPasscode = process.env.ADMIN_PASSCODE || "naheed2026";
    const serverKey = process.env.ADMIN_SECURE_KEY || "naheed-sons-secure-2026";

    if (passcode) {
      if (passcode === serverPasscode) {
        return NextResponse.json({ success: true, message: "Authentication successful" });
      }
      return NextResponse.json({ success: false, error: "Invalid administrator passcode" }, { status: 401 });
    }

    if (key) {
      if (key === serverKey) {
        return NextResponse.json({ success: true, message: "Valid secure access key" });
      }
      return NextResponse.json({ success: false, error: "Invalid secure access key" }, { status: 401 });
    }

    return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Authentication failed", details: error.message }, { status: 500 });
  }
}
