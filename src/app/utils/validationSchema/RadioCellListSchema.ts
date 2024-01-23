import { z } from 'zod';

export const RadioCellSchema = z.object({
    cellId: z.string(),
    gnbDuId: z.string(),
    pci: z.number(),
    cellType: z.string(),
    siteId: z.string(),
    siteType: z.string(),
    azimuth: z.number(),
    height: z.number(),
    pointGeometry: z.object({
        coordinates: z.array(z.number()),
        radius: z.number(),
    }),
});

export const RadioCellListSchema = z.object({
    total: z.number(),
    radioCells: z.array(RadioCellSchema),
});
