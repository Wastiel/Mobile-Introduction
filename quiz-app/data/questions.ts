// data/questions.ts
import { QuestionService } from '../services/QuestionService';

export async function loadQuestions(category: string, count: number) {
  const allQuestions = await QuestionService.fetchQuestionFromOpenAI(category, count);
  return allQuestions.slice(0, count); // pega só as 3 primeiras
}