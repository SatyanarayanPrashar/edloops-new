import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import saveQuiz from "../saveToDb";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf");

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const userId = session.user.id;

  try {
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ",
    });
    const docs = await pdfLoader.load();

    const selectedDocuments = docs.filter(
      (doc) => doc.pageContent !== undefined
    );
    const texts = selectedDocuments.map((doc) => doc.pageContent);

    const prompt =
      `given the text which is a summary of the document, generate a quiz with only 2 questions based on the text. Return json only that contains a quizz object with fields: name, description, userId (which will be ${userId}) and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.`;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not provided" },
        { status: 500 }
      );
    }

    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4-1106-preview",
    });

    const parser = new JsonOutputFunctionsParser();
    const extractionFunctionSchema = {
      name: "extractor",
      description: "Extracts fields from the output",
      parameters: {
        type: "object",
        properties: {
          quizz: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              userId: {type: "number"},
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    questionText: { type: "string" },
                    answers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          answerText: { type: "string" },
                          isCorrect: { type: "boolean" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const runnable = model
      .bind({
        functions: [extractionFunctionSchema],
        function_call: { name: "extractor" },
      })
      .pipe(parser);

    const message = new HumanMessage({
      content: prompt + "\n" + texts.join("\n"),
    });

    const result: any = await runnable.invoke([message]);
    
    // Print the response from the OpenAI model
    console.log("OpenAI Model Response:", JSON.stringify(result, null, 2));

    // Save the quiz to the database
    const quizId = await saveQuiz(result.quizz);

    return NextResponse.json({ message: "Quiz Created", quizId }, { status: 200 });
  } catch (e: any) {
    // Log the error message for debugging
    console.error("Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import saveQuiz from "../saveToDb";

// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';

// export async function POST(req: NextRequest) {
//   const body = await req.formData();
//   const document = body.get("pdf");

//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const userId = session.user.id;

//   try {
//     // Manually set the quiz data for debugging
//     const result = {
//       quizz: {
//         name: "System Design Fundamentals",
//         description: "This quiz covers the basic concepts and importance of system design, high-level and low-level design considerations, examples of system design use cases, and important concepts in distributed systems and database design such as sharding and the CAP theorem.",
//         userId: 1,
//         questions: [
//           {
//             questionText: "What are the key considerations in system design?",
//             answers: [
//               {
//                 answerText: "Scalability, Reliability, Maintainability, Performance, Security",
//                 isCorrect: true
//               },
//               {
//                 answerText: "Color schemes, Usability, Branding, Marketing strategies",
//                 isCorrect: false
//               },
//               {
//                 answerText: "Cost management, Human resources, Product lifecycle, Supply chain logistics",
//                 isCorrect: false
//               },
//               {
//                 answerText: "Programming languages, Code repositories, Development frameworks, Version control systems",
//                 isCorrect: false
//               }
//             ]
//           },
//           {
//             questionText: "According to the CAP theorem, which combination of properties can a distributed system maximally achieve at the same time?",
//             answers: [
//               {
//                 answerText: "Consistency, Availability, Partition Tolerance",
//                 isCorrect: false
//               },
//               {
//                 answerText: "Consistency, Availability",
//                 isCorrect: false
//               },
//               {
//                 answerText: "Availability, Partition Tolerance",
//                 isCorrect: false
//               },
//               {
//                 answerText: "Consistency, Partition Tolerance or Availability, Partition Tolerance, but not all three simultaneously",
//                 isCorrect: true
//               }
//             ]
//           }
//         ]
//       }
//     };

//     // Save the quiz to the database using the predefined quiz data
//     const quizId = await saveQuiz(result.quizz);

//     return NextResponse.json({ message: "Quiz Created", quizId }, { status: 200 });
//   } catch (e: any) {
//     // Log the error message for debugging
//     console.error("Error:", e.message);
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }
