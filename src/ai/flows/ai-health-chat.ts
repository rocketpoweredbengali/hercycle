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

  Respond to the following user query:
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
