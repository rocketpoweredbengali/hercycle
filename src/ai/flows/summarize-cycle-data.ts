'use server';
/**
 * @fileOverview AI-driven summarization tool for user’s historical data, which identifies notable trends, predictions and highlights, helping users understand cycle patterns.
 *
 * - summarizeCycleData - A function that handles the cycle data summarization process.
 * - SummarizeCycleDataInput - The input type for the summarizeCycleData function.
 * - SummarizeCycleDataOutput - The return type for the summarizeCycleData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCycleDataInputSchema = z.object({
  cycleData: z.string().describe('The user’s historical cycle data in JSON format.'),
});
export type SummarizeCycleDataInput = z.infer<typeof SummarizeCycleDataInputSchema>;

const SummarizeCycleDataOutputSchema = z.object({
  summary: z.string().describe('The summary of the cycle data, including trends and predictions.'),
});
export type SummarizeCycleDataOutput = z.infer<typeof SummarizeCycleDataOutputSchema>;

export async function summarizeCycleData(input: SummarizeCycleDataInput): Promise<SummarizeCycleDataOutput> {
  return summarizeCycleDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCycleDataPrompt',
  input: {schema: SummarizeCycleDataInputSchema},
  output: {schema: SummarizeCycleDataOutputSchema},
  prompt: `You are a helpful assistant that summarizes cycle data, identifying trends and making predictions. 

  Analyze the following cycle data and provide a summary of the trends and predictions. 

  Cycle Data: {{{cycleData}}}
  `,
});

const summarizeCycleDataFlow = ai.defineFlow(
  {
    name: 'summarizeCycleDataFlow',
    inputSchema: SummarizeCycleDataInputSchema,
    outputSchema: SummarizeCycleDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
