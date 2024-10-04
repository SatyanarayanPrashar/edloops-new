'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createResource() {
  try {
    // Data to be added to the Resource table
    const newResource = await prisma.resource.create({
      data: {
        id: "unique_id_123",
        title: "New Resource Title",
        description: "This is the description of the resource",
        transcript: "This is the transcript of the resource",
      },
    });

    console.log("Resource created:", newResource);
  } catch (error) {
    console.error("Error creating resource:", error);
  } finally {
    // Close the connection to the database
    await prisma.$disconnect();
  }
}

createResource();
