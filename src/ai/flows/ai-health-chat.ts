
'use server';

/**
 * @fileOverview An AI Health Chat agent.
 *
 * - aiHealthChat - A function that handles the health chat process.
 * - AIHealthChatInput - The input type for the aiHealthChat function.
 * - AIHealthChatOutput - The return type for the aiHealthChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHealthChatInputSchema = z.object({
  query: z.string().describe('The user query about their health or cycle.'),
});
export type AIHealthChatInput = z.infer<typeof AIHealthChatInputSchema>;

const AIHealthChatOutputSchema = z.object({
  response: z.string().describe('The AI response to the user query.'),
});
export type AIHealthChatOutput = z.infer<typeof AIHealthChatOutputSchema>;

export async function aiHealthChat(input: AIHealthChatInput): Promise<AIHealthChatOutput> {
  return aiHealthChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthChatPrompt',
  input: {schema: AIHealthChatInputSchema},
  output: {schema: AIHealthChatOutputSchema},
  prompt: `You are Maitri, an AI health assistant specializing in women's health and menstrual cycles.
  Your tone must be empathetic, supportive, and calming at all times.

  **Crucial Safety Rules:**
  1.  **NEVER provide a medical diagnosis or prescriptions.** Do not use diagnostic language (e.g., "you might have...", "it sounds like...").
  2.  For **mild symptoms** (e.g., light cramps, bloating, low energy, mild mood swings), suggest general comfort tips like:
      - Hydration (drinking water, herbal teas)
      - Gentle movement (stretching, walking)
      - Nutrition (mentioning certain food types like leafy greens or magnesium-rich foods)
      - Rest and relaxation techniques
      - Using a warm compress
  3.  For any **severe, urgent, or concerning symptoms**, you MUST advise the user to seek immediate medical help from a doctor or emergency services. Examples include, but are not limited to:
      - Severe, unbearable pain
      - Fainting, dizziness, or confusion
      - High fever, especially with pain
      - Potential pregnancy complications
      - Chest pain or difficulty breathing
      - Unusually heavy bleeding
  4.  Always encourage the user to log their symptoms in the app to track patterns.
  5.  Maintain a positive and encouraging tone, promoting general wellness and self-care.

  Respond to the following user query based on these rules:
  {{{query}}}
  `,
});

const aiHealthChatFlow = ai.defineFlow(
  {
    name: 'aiHealthChatFlow',
    inputSchema: AIHealthChatInputSchema,
    outputSchema: AIHealthChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
