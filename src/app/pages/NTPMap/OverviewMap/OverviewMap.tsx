import { Box, SvgIcon } from '@mui/material';
import { BBox } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { LngLatBoundsLike, MapRef, Marker, NavigationControl, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ordered-imports/ordered-imports
import Antenna from '../../../../assets/ant.svg?react';
import { useMapCoordinates } from '../../../state/MapContext';
import { Cluster, Coordinates, MarkerData, Point } from '../../../types/Map';
import { RadioCell } from '../../../types/RadioCell';
import { MapConfig } from '../../shared/Map/MapConfig';
import { styles } from '../../shared/Map/styles';
import { PopupContent } from '../PopupContent';

export type OverviewMapProps = {
    radioCellsList: RadioCell[];
    selectedRadioCell: string;
    setSelectedRadioCell: (radioCellId: string) => void;
};

export const OverviewMap = ({
    radioCellsList,
    selectedRadioCell,
    setSelectedRadioCell,
}: OverviewMapProps) => {
    const { mapNTPState, updateMapNTPState } = useMapCoordinates(); // Use context
    const [popup, setPopup] = useState<MarkerData | null>(null);
    const mapRef = useRef<MapRef>(null);
    const previousSelectedCellName = useRef('');
    const previousSelectedCellLatitude = useRef(MapConfig.initialLatitudeNTP);
    const previousSelectedCellLongitude = useRef(MapConfig.initialLongitudeNTP);
    const [clusters, setClusters] = useState<Cluster[]>([]);
    const [bounds, setBounds] = useState<BBox>(MapConfig.initialBounds);
    const [zoom, setZoom] = useState<number>(MapConfig.initialZoomNTP);
    const [points, setPoints] = useState<Point[]>([]);
    const [isZooming, setIsZooming] = useState(false);

    const superCluster = useMemo(() => new Supercluster(MapConfig.superclusterConfig), []);

    const moveDuration = useCallback(({ latitude, longitude }: Coordinates) => {
        const roundToPrecision = (num: number) => {
            return Math.round(num * MapConfig.precisionFactor) / MapConfig.precisionFactor;
        };
        const roundedPrevLat = roundToPrecision(previousSelectedCellLatitude.current);
        const roundedPrevLon = roundToPrecision(previousSelectedCellLongitude.current);
        const roundedCurrentLat = roundToPrecision(latitude);
        const roundedCurrentLon = roundToPrecision(longitude);
        if (roundedPrevLat === roundedCurrentLat && roundedPrevLon === roundedCurrentLon) {
            return MapConfig.minMoveDurationMs;
        } else {
            return MapConfig.maxMoveDurationMs;
        }
    }, []);

    const centerMapOnMarker = useCallback(
        ({ longitude, latitude }: Coordinates) => {
            if (mapRef.current) {
                mapRef.current.getMap().flyTo({
                    center: [longitude, latitude],
                    speed: MapConfig.flySpeed,
                    curve: MapConfig.flyCurve,
                    essential: true,
                    duration: moveDuration({ latitude, longitude }),
                });
                previousSelectedCellLatitude.current = latitude;
                previousSelectedCellLongitude.current = longitude;
            }
        },
        [moveDuration],
    );

    const handleOpenPopup = ({ name, latitude, longitude }: MarkerData) => {
        if (mapRef.current) {
            if (name === previousSelectedCellName.current && popup) return;
            if (popup) {
                setPopup(null);
            }
            setSelectedRadioCell('');
            mapRef.current.getMap().flyTo({
                center: [longitude, latitude],
                speed: MapConfig.flySpeed,
                curve: MapConfig.flyCurve,
                essential: true,
                duration: moveDuration({ latitude, longitude }),
            });

            setTimeout(() => {
                setPopup(prevPopup => {
                    if (prevPopup && prevPopup.name !== name) {
                        return prevPopup;
                    }
                    return {
                        name,
                        latitude,
                        longitude,
                    };
                });
                previousSelectedCellName.current = name;
                previousSelectedCellLatitude.current = latitude;
                previousSelectedCellLongitude.current = longitude;
            }, moveDuration({ latitude, longitude }));
        }
    };

    const openCluster = (clusterId: number, longitude: number, latitude: number) => {
        setPopup(null);
        setIsZooming(true);
        if (clusterId != null && mapRef.current) {
            const clickZoom = Math.floor(
                Math.min(
                    superCluster.getClusterExpansionZoom(clusterId) *
                        MapConfig.clusterZoomMultiplier,
                    MapConfig.maxClusterZoomLevel,
                ),
            );
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: clickZoom,
                speed: MapConfig.clusterFlySpeed,
            });
        }
    };

    const fitMapToBounds = (markers: RadioCell[]) => {
        if (!mapRef.current || markers.length === 0) return;

        const longitudes = markers.map(marker => marker.pointGeometry.coordinates[0]);
        const latitudes = markers.map(marker => marker.pointGeometry.coordinates[1]);
        const calculatedBounds: LngLatBoundsLike = [
            [Math.min(...longitudes), Math.min(...latitudes)],
            [Math.max(...longitudes), Math.max(...latitudes)],
        ];

        const map = mapRef.current.getMap();
        map.fitBounds(calculatedBounds, {
            padding: 40,
        });
        previousSelectedCellLatitude.current = map.getCenter().lat;
        previousSelectedCellLongitude.current = map.getCenter().lng;
    };

    const updateBounds = useCallback(() => {
        if (mapRef.current) {
            const map = mapRef.current.getMap();
            previousSelectedCellLatitude.current = map.getCenter().lat;
            previousSelectedCellLongitude.current = map.getCenter().lng;
            const newBounds = map.getBounds().toArray().flat() as BBox;
            setBounds(newBounds);

            const newCenter = map.getCenter();
            const newZoom = map.getZoom();

            updateMapNTPState({
                coordinates: {
                    latitude: newCenter.lat,
                    longitude: newCenter.lng,
                },
                zoom: newZoom,
            });

            setZoom(newZoom);
        }
    }, [updateMapNTPState]);

    useEffect(() => {
        if (mapRef.current && radioCellsList.length > 0) {
            fitMapToBounds(radioCellsList);
        }
    }, [radioCellsList]);

    useEffect(() => {
        const mappedPoints: Point[] = radioCellsList.map(cell => ({
            type: 'Feature',
            properties: { cell, cluster: false },
            geometry: {
                type: 'Point',
                coordinates: cell.pointGeometry.coordinates,
            },
        }));
        setPoints(mappedPoints);
        superCluster.load(mappedPoints);
    }, [radioCellsList, superCluster]);

    useEffect(() => {
        superCluster.load(points);
        if (bounds) {
            setClusters(superCluster.getClusters(bounds, zoom));
        }
    }, [radioCellsList, zoom, bounds, points, superCluster]);

    useEffect(() => {
        if (mapRef.current) {
            setBounds(mapRef.current.getMap().getBounds().toArray().flat() as BBox);
        }
    }, []);

    return (
        <Box sx={styles.overviewMapWrapper}>
            <Map
                initialViewState={{
                    latitude: mapNTPState.coordinates.latitude,
                    longitude: mapNTPState.coordinates.longitude,
                    zoom: mapNTPState.zoom,
                    bearing: 0,
                    pitch: 0,
                }}
                ref={mapRef}
                mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                style={styles.map}
                dragRotate={false}
                touchZoomRotate={false}
                attributionControl={false}
                onZoomEnd={e => {
                    setIsZooming(false);
                    setZoom(Math.round(e.viewState.zoom));
                    updateBounds();
                }}
                onMove={updateBounds}
                onMoveEnd={updateBounds}
                onLoad={updateBounds}
            >
                <NavigationControl />
                {clusters?.map(item => {
                    const [longitude, latitude] = item.geometry.coordinates;
                    if (item?.properties?.cluster) {
                        const { point_count, cluster_id } = item.properties;
                        const leaves = superCluster?.getLeaves(cluster_id, Infinity);
                        const isActiveInCluster = leaves.some(
                            leaf => leaf.properties.cell.cellId === selectedRadioCell,
                        );
                        return (
                            <Marker
                                key={`cluster-${cluster_id}`}
                                longitude={longitude}
                                latitude={latitude}
                                style={styles.cluster(isActiveInCluster)}
                                onClick={() => openCluster(cluster_id, longitude, latitude)}
                                data-testid={`cluster-${item.properties.cluster_id}`}
                            >
                                <SvgIcon sx={styles.cluster(isActiveInCluster)}>
                                    <Antenna fill="#34e300" stroke="white" />
                                </SvgIcon>
                                <Box sx={styles.clusterCounter(isActiveInCluster)}>
                                    {point_count > 99 ? '99+' : point_count}
                                </Box>
                            </Marker>
                        );
                    } else {
                        const cell = item?.properties?.cell;
                        const isActive =
                            popup?.name !== cell?.cellId && selectedRadioCell === cell?.cellId;
                        return (
                            <Marker
                                key={cell.cellId}
                                longitude={longitude}
                                latitude={latitude}
                                style={styles.marker(isActive)}
                                onClick={() => {
                                    handleOpenPopup({
                                        name: cell.cellId,
                                        longitude: longitude,
                                        latitude: latitude,
                                    });
                                    centerMapOnMarker({ longitude, latitude });
                                }}
                                data-testid={`marker-${cell.cellId}`}
                            >
                                <SvgIcon sx={styles.marker(isActive)}>
                                    <Antenna
                                        fill={isActive ? '#261a7c' : '#ff9e00'}
                                        stroke="white"
                                    />
                                </SvgIcon>
                            </Marker>
                        );
                    }
                })}
                {popup && (
                    <Popup
                        longitude={popup.longitude}
                        latitude={popup.latitude}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                        style={styles.popup}
                        focusAfterOpen={false}
                    >
                        <PopupContent cellId={popup.name} />
                    </Popup>
                )}
                {isZooming && <Box sx={styles.zooming}> Zooming...</Box>}
            </Map>
        </Box>
    );
};
