import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({
      code: 4001,
      success: false,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = `${process.env.STATIC_PATH}${file.name}`;
  await writeFile(filePath, buffer);
  const fileUrl = `${process.env.STATIC_URL}${file.name}`;
  // console.log(`open ${filePath} to see the uploaded file`);

  return NextResponse.json({ code: 200, data: fileUrl, success: true });
}
