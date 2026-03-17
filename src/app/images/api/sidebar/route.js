import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Hum JSON file use kar rahe hain taake koi extra dependency (sqlite waghera) install na karni pare.
// Extract DB path
const dbPath = path.join(process.cwd(), 'data', 'sidebar.json');

async function initDb() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
  
  try {
    await fs.access(dbPath);
  } catch {
    // Default initial data
    await fs.writeFile(dbPath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  try {
    await initDb();
    const data = await fs.readFile(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await initDb();
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const route = formData.get('route');

    if (!file || !title || !route) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const extension = path.extname(originalName) || '.png';
    const fileName = `${Date.now()}_${title.replace(/\s+/g, '_')}${extension}`;

    // Upload folder inside public/images/sidebar
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'sidebar');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const icon_url = `/images/sidebar/${fileName}`;
    
    // Read current data
    const data = await fs.readFile(dbPath, 'utf8');
    const items = JSON.parse(data);
    
    const newItem = {
      id: Date.now().toString(),
      title,
      icon_url,
      route
    };
    
    items.push(newItem);
    await fs.writeFile(dbPath, JSON.stringify(items, null, 2));

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
