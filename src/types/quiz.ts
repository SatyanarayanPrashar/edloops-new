export interface SaveQuizData {
    id?: string;
    name: string;
    description: string;
    userId: number;
    questions: Array<{
      questionText: string;
      answers: Array<{
        answerText: string;
        isCorrect: boolean;
      }>
    }>
}