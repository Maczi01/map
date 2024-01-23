import { z } from 'zod';

export const RadioCellStatsSchema = z.object({
    cellId: z.string(),
    gnbDuId: z.string(),
    pci: z.number(),
    criteria: z.string(),
    historicalData: z.array(
        z.object({
            time: z.string(),
            value: z.number(),
        }),
    ),
    predictionData: z.array(
        z.object({
            time: z.string(),
            value: z.number(),
        }),
    ),
    predictionAccuracy: z.array(
        z.object({
            time: z.string(),
            value: z.number(),
        }),
    ),
    averageAccuracy: z.number(),
});
