import { SeriesAreaOptions } from 'highcharts';

export const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
};

type chartData = {
    time: string;
    value: number;
};

export const getFormattedData = (
    data: chartData[] | undefined,
    datasetId: string,
): SeriesAreaOptions['data'] => {
    if (!data) return [];

    return data.map(value => ({
        x: new Date(value.time).getTime(),
        y: value.value,
        custom: {
            time: value.time,
            datasetId: datasetId,
        },
    }));
};
