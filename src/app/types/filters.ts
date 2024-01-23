export const FilterTypes = {
    UPLINK: 'UPLINK',
    DOWNLINK: 'DOWNLINK',
    LATENCY: 'LATENCY',
};

export const QoSTypes = {
    HO_REQ: 'HO_REQ',
    HO_SUCCESS: 'HO_SUCCESS',
    QOSFLOW_PDCP_UL: 'QOSFLOW_PDCP_UL',
    QOSFLOW_PDCP_DL: 'QOSFLOW_PDCP_DL',
};

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes];

export type QoSType = (typeof QoSTypes)[keyof typeof QoSTypes];
