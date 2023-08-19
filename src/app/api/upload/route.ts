import { NextRequest, NextResponse } from 'next/server';
import { minioClient } from '@/utils/minio';

const bucketName = process.env.MINIO_BUCKET_NAME;

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  const contentType = data.get('contentType') as string;

  if (!file) {
    return NextResponse.json({
      code: 4001,
      success: false,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}_${data.get('fileName')}`;
  await minioClient.putObject(bucketName, fileName, buffer, {
    'Content-Type': contentType,
  });

  // 生成24小时有效的签名URL
  const presignedUrl = await minioClient.presignedGetObject(bucketName, fileName, 24 * 60 * 60);

  return NextResponse.json({
    code: 200,
    data: {
      url: presignedUrl,
      fileName,
      bucketName,
    },
    success: true,
  });
}
