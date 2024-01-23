import { ApiResponseType } from '../types/ApiResponseType';
import { RadioCellList, RadioCellNTPDetails, RadioCellStats } from '../types/RadioCell';
import {
    RadioCellListSchema,
    RadioCellNTPDetailsSchema,
    RadioCellStatsSchema,
} from '../utils/validationSchema';
import { api } from './api';

export const getRadioCellNTPList = async () => {
    try {
        const response = await api.get<ApiResponseType<RadioCellList>>('/data/v1/radio/cell/list');
        return RadioCellListSchema.parse(response.data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and validating data:', error);
        throw error;
    }
};
export const getRadioCellNTPDetails = async (cellId: string) => {
    try {
        const response = await api.get<ApiResponseType<RadioCellNTPDetails>>(
            '/data/v1/radio/cell/latest',
            {
                params: { cellId },
            },
        );
        return RadioCellNTPDetailsSchema.parse(response.data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and validating data:', error);
        throw error;
    }
};
export const getRadioCellNTPStats = async (cellId: string, criteria: string) => {
    try {
        const response = await api.get<ApiResponseType<RadioCellStats>>('/data/v1/radio/cell', {
            params: {
                cellId,
                criteria,
            },
        });
        return RadioCellStatsSchema.parse(response.data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and validating data:', error);
        throw error;
    }
};
