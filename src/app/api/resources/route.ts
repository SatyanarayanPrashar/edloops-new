// src/app/api/resources/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { id, title, description, transcript } = await request.json();

  try {
    const newResource = await prisma.resource.create({
      data: {
        id,
        title,
        description,
        transcript,
      },
    });
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json({ error: "Error creating resource" }, { status: 500 });
  }
}

