import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided in the request" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save directory path
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Generate unique name to prevent naming collisions
    const fileExtension = path.extname(file.name) || ".bin";
    const baseName = path.basename(file.name, fileExtension)
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    
    const uniqueFilename = `${baseName}_${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Write file to the public/uploads directory
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: relativeUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error("Upload error details:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
