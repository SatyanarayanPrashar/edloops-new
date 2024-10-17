import { prisma } from "@/lib/prisma";
import { SaveQuizData } from "@/types/quiz";
  
export default async function saveQuiz(quizData: SaveQuizData) {
    const { name, description, userId, questions } = quizData;

    console.log("1")
    console.log(quizData)
    
    // Make sure questions array exists and is not empty
    if (!questions || questions.length === 0) {
        throw new Error("Quiz must contain at least one question.");
    }
    
    console.log("2")
    // Iterate over questions and check for answers
    const newQuiz = await prisma.quiz.create({
        data: {
            name,
            description,
            user: { connect: { id: userId } },
            questions: {
                create: questions.map((question) => {
                    if (!question.answers || question.answers.length === 0) {
                        throw new Error("Each question must contain at least one answer.");
                    }
                    
                    return {
                        questionText: question.questionText,
                        answers: {
                            create: question.answers.map((answer) => ({
                                answerText: answer.answerText,
                                isCorrect: answer.isCorrect,
                            })),
                        },
                    };
                }),
            },
        },
        include: {
            questions: {
                include: {
                    answers: true,
                },
            },
        },
    });
    console.log("3")
  
    return { quizId: newQuiz.id };
  }
  