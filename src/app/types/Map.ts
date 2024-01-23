import { GeoJsonProperties } from 'geojson';
import { ClusterFeature, PointFeature } from 'supercluster';

import { RadioCell } from './RadioCell';

export type Coordinates = {
    latitude: number;
    longitude: number;
};
export type MarkerData = Coordinates & {
    name: string;
};

export type Cluster = PointFeature<GeoJsonProperties> | ClusterFeature<GeoJsonProperties>;

export type RadioCellProperties = {
    cluster: boolean;
    cell: RadioCell;
    geoJsonProps?: GeoJsonProperties;
};

export type Point = {
    type: 'Feature';
    properties: RadioCellProperties;
    geometry: {
        type: 'Point';
        coordinates: number[];
    };
};
