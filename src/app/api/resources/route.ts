// src/app/api/resources/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resource } from "@/types/resource";

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

export async function GET() {
  try {
    const resources = await prisma.resource.findMany();
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Error fetching resources" }, { status: 500 });
  }
}

export const getResourceById = async (resourceId: string): Promise<Resource | null> => {
  try {
    const resource = await prisma.resource.findUnique({
      where: {
        id: resourceId,
      },
    });
    return resource || null; // Return null if not found
  } catch (error) {
    console.error("Error fetching resource:", error);
    return null; // Handle the error as appropriate
  }
};