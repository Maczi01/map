import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { MapConfig } from '../pages/shared/Map/MapConfig';
import { Coordinates } from '../types/Map';

type MapStateType = {
    coordinates: Coordinates;
    zoom: number;
};

type MapContextType = {
    mapNTPState: MapStateType;
    mapQoSState: MapStateType;
    updateMapNTPState: (state: MapStateType) => void;
    updateMapQoSState: (state: MapStateType) => void;
};

const defaultValues: {
    mapNTPState: MapStateType;
    mapQoSState: MapStateType;
    updateMapNTPState: (state: MapStateType) => void;
    updateMapQoSState: (state: MapStateType) => void;
} = {
    mapNTPState: {
        coordinates: {
            latitude: MapConfig.initialLatitudeNTP,
            longitude: MapConfig.initialLongitudeNTP,
        },
        zoom: MapConfig.initialZoomNTP,
    },
    mapQoSState: {
        coordinates: {
            latitude: MapConfig.initialLatitudeQoS,
            longitude: MapConfig.initialLongitudeQoS,
        },
        zoom: MapConfig.initialZoomQoS,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateMapNTPState: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateMapQoSState: () => {},
};

const MapContext = createContext<MapContextType>(defaultValues);

export const MapProvider = ({ children }: { children: ReactNode }) => {
    const [mapNTPState, setMapNTPState] = useState<MapStateType>({
        coordinates: {
            latitude: MapConfig.initialLatitudeNTP,
            longitude: MapConfig.initialLongitudeNTP,
        },
        zoom: MapConfig.initialZoomNTP,
    });
    const [mapQoSState, setMapQoSState] = useState<MapStateType>({
        coordinates: {
            latitude: MapConfig.initialLatitudeQoS,
            longitude: MapConfig.initialLongitudeQoS,
        },
        zoom: MapConfig.initialZoomQoS,
    });

    const updateMapNTPState = useCallback((state: MapStateType) => {
        setMapNTPState(state);
    }, []);
    const updateMapQoSState = useCallback((state: MapStateType) => {
        setMapQoSState(state);
    }, []);

    return (
        <MapContext.Provider
            value={{ mapNTPState, mapQoSState, updateMapNTPState, updateMapQoSState }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMapCoordinates = () => {
    const context = useContext(MapContext);
    if (context === null) {
        throw new Error('useMapCoordinates must be used within a MapProvider');
    }
    return context;
};
