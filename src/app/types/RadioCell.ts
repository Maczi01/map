export type PointGeometry = {
    coordinates: number[];
    radius: number;
};

export type RadioCell = {
    cellId: string;
    gnbDuId: string;
    pci: number;
    cellType: string;
    siteId: string;
    siteType: string;
    azimuth: number;
    height: number;
    pointGeometry: PointGeometry;
};

type RadioCellDetails = {
    id: string;
    cellId: string;
    gnbDuId: string;
    pci: number;
    timestampMs: number;
    timestamp: string;
    numSubscribers: number;
    prb_dl: number;
    prb_ul: number;
    bandwidthHz: number;
    uplink: number;
    downlink: number;
    handoverSuccessRate: number;
    tag: string;
};

export type RadioCellNTPDetails = RadioCellDetails & {
    latency: number;
    jitter: number;
    cqi: number;
    packetLoss: number;
    rsrp: number;
    rsrq: number;
};

export type RadioCellQoSDetails = RadioCellDetails & {
    qosScore: number;
    qosflowPdcpUl: number;
    qosflowPdcpDl: number;
    hoReq: number;
    hoSuccess: number;
};

export type RadioCellList = {
    total: number;
    radioCells: RadioCell[];
};

type HistoricalData = {
    time: string;
    value: number;
};

type PredictionData = {
    time: string;
    value: number;
};

type PredictionAccuracyData = {
    time: string;
    value: number;
};

export type RadioCellStats = {
    cellId: string;
    gnbDuId: string;
    pci: number;
    siteId: string;
    criteria: string;
    historicalData: HistoricalData[];
    predictionData: PredictionData[];
    predictionAccuracy: PredictionAccuracyData[];
    averageAccuracy: number;
};
