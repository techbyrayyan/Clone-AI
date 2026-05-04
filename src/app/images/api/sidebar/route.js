import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const dbPath = path.join(process.cwd(), 'data', 'sidebar.json');
const uploadDir = path.join(process.cwd(), 'public', 'images', 'sidebar');
async function initDb() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
  
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify([], null, 2));
  }
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (e) {}
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
    const order = formData.get('order') || '0';
    if (!file || !title || !route) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name) || '.png';
    const fileName = `${Date.now()}_${title.replace(/\s+/g, '_')}${extension}`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.writeFile(filePath, buffer);
    const icon_url = `/images/sidebar/${fileName}`;
    
    const data = await fs.readFile(dbPath, 'utf8');
    const items = JSON.parse(data);
    
    const newItem = {
      id: Date.now().toString(),
      title,
      icon_url,
      route,
      order: parseInt(order)
    };
    
    items.push(newItem);
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    await fs.writeFile(dbPath, JSON.stringify(items, null, 2));
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    await initDb();
    const formData = await request.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const route = formData.get('route');
    const order = formData.get('order');
    const file = formData.get('file');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const data = await fs.readFile(dbPath, 'utf8');
    let items = JSON.parse(data);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    let icon_url = items[index].icon_url;
    if (file && typeof file !== 'string') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}_${title.replace(/\s+/g, '_')}${path.extname(file.name) || '.png'}`;
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      
      // Delete old icon
      const oldFileName = items[index].icon_url.split('/').pop();
      try { await fs.unlink(path.join(uploadDir, oldFileName)); } catch (e) {}
      
      icon_url = `/images/sidebar/${fileName}`;
    }
    items[index] = {
      ...items[index],
      title: title || items[index].title,
      route: route || items[index].route,
      order: order !== null ? parseInt(order) : items[index].order,
      icon_url
    };
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    await fs.writeFile(dbPath, JSON.stringify(items, null, 2));
    return NextResponse.json(items[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const data = await fs.readFile(dbPath, 'utf8');
    let items = JSON.parse(data);
    const itemToDelete = items.find(item => item.id === id);
    if (!itemToDelete) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    const fileName = itemToDelete.icon_url.split('/').pop();
    try { await fs.unlink(path.join(uploadDir, fileName)); } catch (e) {}
    items = items.filter(item => item.id !== id);
    await fs.writeFile(dbPath, JSON.stringify(items, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}