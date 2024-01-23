// import { addSeconds, formatISO } from 'date-fns';
// import { format } from 'date-fns-tz';

import { RadioCellList, RadioCellQoSDetails } from '../types/RadioCell';

// interface DataEntry {
//     time: string;
//     value: number;
// }

// const currentDate = new Date();
// const formattedDate = format(currentDate, 'yyyy-MM-dd');

export const cellDetailsQoS: RadioCellQoSDetails = {
    id: 'string',
    cellId: 'Cell_id_11',
    gnbDuId: 'HNgUIJ',
    pci: 0,
    timestampMs: 0,
    timestamp: '2024-01-15T20:00:59.886Z',
    numSubscribers: 0,
    prb_dl: 0,
    prb_ul: 0,
    bandwidthHz: 0,
    uplink: 0,
    downlink: 0,
    qosScore: 97,
    handoverSuccessRate: 0,
    qosflowPdcpUl: 0,
    qosflowPdcpDl: 0,
    hoReq: 0,
    hoSuccess: 0,
    tag: 'string',
};

export const cellListQoS: RadioCellList = {
    total: 0,
    radioCells: [
        {
            cellId: 'Cell_id_0',
            gnbDuId: 'KLojfd7',
            pci: 253,
            cellType: 'MACRO',
            siteId: 'string',
            siteType: 'INDOOR',
            azimuth: 0,
            height: 0,
            pointGeometry: {
                coordinates: [-9.465250723, 53.805703],
                radius: 0,
            },
        },
        {
            cellId: 'Cell_id_2',
            gnbDuId: 'jjk81Q',
            pci: 616,
            cellType: 'MACRO',
            siteId: 'string',
            siteType: 'INDOOR',
            azimuth: 0,
            height: 0,
            pointGeometry: {
                coordinates: [-8.968, 53.25855],
                radius: 0,
            },
        },
        {
            cellId: 'Cell_id_3',
            gnbDuId: 'JKJ989',
            pci: 716,
            cellType: 'MACRO',
            siteId: 'string',
            siteType: 'INDOOR',
            azimuth: 0,
            height: 0,
            pointGeometry: {
                coordinates: [-8.0669194699, 52.92967199023639],
                radius: 0,
            },
        },
        {
            cellId: 'Cell_id_4',
            gnbDuId: 'kklfd9s',
            pci: 116,
            cellType: 'MACRO',
            siteId: 'string',
            siteType: 'INDOOR',
            azimuth: 0,
            height: 0,
            pointGeometry: {
                coordinates: [-8.917456699, 53.8367121065],
                radius: 0,
            },
        },
    ],
};

const generatePredictionDataHO_REQ = (
    startTime: string = '10:34:04',
    intervalMinutes: number = 4,
    totalRecords: number = 150,
    minValue: number = 4,
    maxValue: number = 80,
) => {
    const data: { time: string; value: number }[] = [];
    const today = new Date();
    const dateStr = today.toISOString().substring(0, 10); // Get current date in YYYY-MM-DD format
    let time = new Date(`${dateStr}T${startTime}`);

    for (let i = 0; i < totalRecords; i++) {
        const formattedTime = time.toISOString().substring(11, 19);
        const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        data.push({ time: `${dateStr}T${formattedTime}`, value: value });
        time = new Date(time.getTime() + intervalMinutes * 60000);
    }

    return data;
};

const generateHistoricalDataHO_REQ = (
    startTime: string = '10:34:04',
    intervalMinutes: number = 4,
    totalRecords: number = 150,
    minValue: number = 14,
    maxValue: number = 73,
) => {
    const data: { time: string; value: number }[] = [];
    const today = new Date();
    const dateStr = today.toISOString().substring(0, 10); // Get current date in YYYY-MM-DD format
    let time = new Date(`${dateStr}T${startTime}`);

    for (let i = 0; i < totalRecords; i++) {
        const formattedTime = time.toISOString().substring(11, 19);
        const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        data.push({ time: `${dateStr}T${formattedTime}`, value: value });
        time = new Date(time.getTime() + intervalMinutes * 60000);
    }

    return data;
};

const predictionAccuracyHO_REQ = (
    startTime: string = '10:34:04',
    intervalMinutes: number = 4,
    totalRecords: number = 150,
    minValue: number = 79,
    maxValue: number = 100,
) => {
    const data: { time: string; value: number }[] = [];
    const today = new Date();
    const dateStr = today.toISOString().substring(0, 10); // Get current date in YYYY-MM-DD format
    let time = new Date(`${dateStr}T${startTime}`);

    for (let i = 0; i < totalRecords; i++) {
        const formattedTime = time.toISOString().substring(11, 19);
        const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        data.push({ time: `${dateStr}T${formattedTime}`, value: value });
        time = new Date(time.getTime() + intervalMinutes * 60000);
    }

    return data;
};

// const records = generateTimestamps(startTime, intervalMinutes, totalRecords);
// console.log(records);

const prediction = (criteria: string) => {
    switch (criteria) {
        case 'HO_REQ':
            return generatePredictionDataHO_REQ();
        case 'HO_SUCCESS':
            return generatePredictionDataHO_REQ();
        case 'QOSFLOW_PDCP_UL':
            return generatePredictionDataHO_REQ();
        case 'QOSFLOW_PDCP_DL':
            return generatePredictionDataHO_REQ();
        default:
            return [];
    }
};

const historical = (criteria: string) => {
    switch (criteria) {
        case 'HO_REQ':
            return generateHistoricalDataHO_REQ();
        case 'HO_SUCCESS':
            return generateHistoricalDataHO_REQ();
        case 'QOSFLOW_PDCP_UL':
            return generateHistoricalDataHO_REQ();
        case 'QOSFLOW_PDCP_DL':
            return generateHistoricalDataHO_REQ();
        default:
            return [];
    }
};

const accuracy = (criteria: string) => {
    switch (criteria) {
        case 'HO_REQ':
            return predictionAccuracyHO_REQ();
        case 'HO_SUCCESS':
            return predictionAccuracyHO_REQ();
        case 'QOSFLOW_PDCP_UL':
            return predictionAccuracyHO_REQ();
        case 'QOSFLOW_PDCP_DL':
            return predictionAccuracyHO_REQ();
        default:
            return [];
    }
};

// function addRandomValuesToData() {
//     const generateRandomValue = (): number => Math.floor(Math.random() * 90) + 10;
//
//     const addNewEntry = () => {
//         const lastEntryTime = new Date(
//             historicalDataForDownLink[historicalDataForDownLink.length - 1].time,
//         );
//
//         const newTime = addSeconds(lastEntryTime, 122);
//
//         const newEntry1: DataEntry = {
//             time: formatISO(newTime),
//             value: generateRandomValue(),
//         };
//         const newEntry2: DataEntry = {
//             time: formatISO(newTime),
//             value: Math.floor((generateRandomValue() + generateRandomValue()) / 3),
//         };
//         const newEntry3: DataEntry = {
//             time: formatISO(newTime),
//             value: Math.floor((generateRandomValue() + (generateRandomValue()) / 3) + 10),
//         };
//
//         historicalDataForDownLink.push(newEntry1);
//         predictionDataForDownlink.push(newEntry2);
//
//         historicalDataForUplink.push(newEntry1);
//         predictionDataForUplink.push(newEntry2);
//
//         const newEntry4: DataEntry = {
//             time: formatISO(newTime),
//             value: 100 - Math.floor(Math.random() * 10),
//         };
//         const newEntry5: DataEntry = {
//             time: formatISO(newTime),
//             value: 100 - Math.floor(Math.random() * 10),
//         };
//
//         predictionAccuracyForDownLink.push(newEntry4);
//         predictionAccuracyForUplink.push(newEntry5);
//     };
//
//     setInterval(addNewEntry, 10000);
// }
//
// addRandomValuesToData();

export const statsQoS = (criteria: string) => ({
    id: 'string',
    cellId: 'Cell_id_12',
    pci: 99,
    gnbDuId: 'gnbDuId_12',
    siteId: 'string',
    criteria: criteria,
    predictionData: historical(criteria),
    historicalData: prediction(criteria),
    predictionAccuracy: accuracy(criteria),
    averageAccuracy: 100 - Math.floor(Math.random() * 11),
});
