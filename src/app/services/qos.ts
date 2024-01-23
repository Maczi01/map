import { ApiResponseType } from '../types/ApiResponseType';
import { RadioCellList, RadioCellQoSDetails, RadioCellStats } from '../types/RadioCell';
import { RadioCellListSchema, RadioCellStatsSchema } from '../utils/validationSchema';
import { RadioCellQoSDetailsSchema } from '../utils/validationSchema/RadioCellQoSDetailsSchema';
import { api } from './api';

export const getRadioCellQoSList = async () => {
    try {
        const response = await api.get<ApiResponseType<RadioCellList>>('/data/v1/radio/cell/list');
        return RadioCellListSchema.parse(response.data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and validating data:', error);
        throw error;
    }
};
export const getRadioCellQoSDetails = async (cellId: string) => {
    try {
        const response = await api.get<ApiResponseType<RadioCellQoSDetails>>(
            '/data/v1/radio/cell/latest',
            {
                params: { cellId },
            },
        );
        return RadioCellQoSDetailsSchema.parse(response.data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and validating data:', error);
        throw error;
    }
};
export const getRadioCellQoSStats = async (cellId: string, criteria: string) => {
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
