import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import prisma from "@/lib/prisma";

const uploadDir = path.join(process.cwd(), 'public', 'images', 'sidebar');

async function ensureDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (e) {}
}

export async function GET() {
  try {
    const items = await prisma.sidebarItem.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureDir();
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
    
    const newItem = await prisma.sidebarItem.create({
      data: {
        title,
        icon_url,
        route,
        order: parseInt(order)
      }
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const route = formData.get('route');
    const order = formData.get('order');
    const file = formData.get('file');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const existingItem = await prisma.sidebarItem.findUnique({ where: { id } });
    if (!existingItem) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    let icon_url = existingItem.icon_url;

    if (file && typeof file !== 'string') {
      await ensureDir();
      const buffer = Buffer.from(await file.arrayBuffer());
      const extension = path.extname(file.name) || '.png';
      const fileName = `${Date.now()}_${title.replace(/\s+/g, '_')}${extension}`;
      const filePath = path.join(uploadDir, fileName);
      
      await fs.writeFile(filePath, buffer);
      
      // Delete old file
      const oldFileName = existingItem.icon_url.split('/').pop();
      if (oldFileName) {
        try {
          await fs.unlink(path.join(uploadDir, oldFileName));
        } catch (e) {}
      }
      
      icon_url = `/images/sidebar/${fileName}`;
    }

    const updatedItem = await prisma.sidebarItem.update({
      where: { id },
      data: {
        title: title || existingItem.title,
        route: route || existingItem.route,
        order: order !== null ? parseInt(order) : existingItem.order,
        icon_url
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const itemToDelete = await prisma.sidebarItem.findUnique({ where: { id } });

    if (!itemToDelete) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete icon file
    const fileName = itemToDelete.icon_url.split('/').pop();
    if (fileName) {
      try {
        await fs.unlink(path.join(uploadDir, fileName));
      } catch (e) {}
    }

    await prisma.sidebarItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

