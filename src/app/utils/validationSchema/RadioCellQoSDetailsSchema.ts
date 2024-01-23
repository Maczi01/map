import { z } from 'zod';

export const RadioCellQoSDetailsSchema = z.object({
    id: z.string(),
    cellId: z.string(),
    gnbDuId: z.string(),
    pci: z.number(),
    timestampMs: z.number(),
    timestamp: z.string(),
    numSubscribers: z.number(),
    prb_dl: z.number(),
    prb_ul: z.number(),
    uplink: z.number(),
    downlink: z.number(),
    qosScore: z.number(),
    handoverSuccessRate: z.number(),
    qosflowPdcpUl: z.number(),
    qosflowPdcpDl: z.number(),
    hoReq: z.number(),
    hoSuccess: z.number(),
    tag: z.string(),
});
