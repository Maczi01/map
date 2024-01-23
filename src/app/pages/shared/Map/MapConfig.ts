import { BBox } from 'geojson';

export const MapConfig = {
    initialZoomQoS: 13,
    initialLatitudeQoS: 54.615001,
    initialLongitudeQoS: -5.896569,
    initialZoomNTP: 13,
    initialLatitudeNTP: 54.615001,
    initialLongitudeNTP: -5.896569,
    flySpeed: 0.3,
    flyCurve: 1.42,
    maxMoveDurationMs: 800,
    minMoveDurationMs: 200,
    precisionFactor: 10000,
    clusterZoomFactor: 1.1,
    maxZoomLevel: 40,
    clusterZoomMultiplier: 1.1,
    maxClusterZoomLevel: 40,
    clusterFlySpeed: 0.75,
    initialBounds: [-180, -85, 180, 85] as BBox,
    superclusterConfig: {
        radius: 75,
        maxZoom: 17,
        minZoom: 0,
        extent: 512,
        nodeSize: 64,
        log: false,
    },
};
