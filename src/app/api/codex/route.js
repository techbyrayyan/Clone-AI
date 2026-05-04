import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// GET all codex tasks
export async function GET() {
  try {
    const tasks = await prisma.codexTask.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST create a new task
export async function POST(request) {
  try {
    const { title, description, repoName } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTask = await prisma.codexTask.create({
      data: {
        title,
        description,
        repoName,
        status: 'pending'
      }
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

// PUT update a task (status or content)
export async function PUT(request) {
  try {
    const { id, title, description, status, repoName } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedTask = await prisma.codexTask.update({
      where: { id },
      data: {
        title,
        description,
        status,
        repoName
      }
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// DELETE a task
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.codexTask.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
