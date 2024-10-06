// import { NextResponse } from 'next/server';
// import { PrismaClient } from "@prisma/client";
// import { Course, Chapter, Content } from '@/types/resource'; // Adjust import path based on your file structure

// const prisma = new PrismaClient();

// const removeContent = async (chapterIndex: number, contentIndex: number) => {
//     const contentToDelete = course.chapters[chapterIndex].contents[contentIndex];
  
//     // If the content exists in the backend, send delete request
//     if (contentToDelete.id !== 0) {
//       try {
//         const response = await fetch(`/api/course/content/${contentToDelete.id}`, {
//           method: 'DELETE',
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to delete content');
//         }
  
//         console.log(`Content ${contentToDelete.id} deleted successfully from the backend.`);
//       } catch (error) {
//         console.error('Error deleting content:', error);
//         alert("Error deleting content from the server.");
//       }
//     }
  
//     // Remove content from the chapter in the local state
//     const updatedChapters = [...course.chapters];
//     updatedChapters[chapterIndex].contents = updatedChapters[chapterIndex].contents.filter((_, i) => i !== contentIndex);
//     setCourse({ ...course, chapters: updatedChapters });
//   };
  