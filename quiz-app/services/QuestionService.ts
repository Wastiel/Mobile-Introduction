// services/QuestionService.ts

const OPENROUTER_API_KEY = 'aqui vai sua chave';

export class QuestionService {
  static fetchQuestions() {
    throw new Error('Method not implemented.');
  }
  static async fetchQuestionFromOpenAI(category: string, count: number) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seu-site-ou-projeto.com',
        'X-Title': 'SlotMachineEducativo',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'user',
            content: `Gere ${count} perguntas de múltipla escolha em português sobre o conteudo ${category} no seguinte formato JSON:
  [
    {
      "text": "Qual foi o ano da Independência do Brasil?",
      "options": ["1822", "1889", "1500", "1808"],
      "correctAnswerIndex": 0
    },
    ...
  ]`
          }
        ]
      }),
    });
  
    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    const jsonMatch = rawContent?.match(/\[[\s\S]*\]/); // extrai o array JSON
  
    if (!jsonMatch) {
      throw new Error('JSON inválido ou não encontrado.');
    }
  
    return JSON.parse(jsonMatch[0]);
  }
}
