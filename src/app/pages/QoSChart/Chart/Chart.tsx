import { Box, Typography } from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';
import Highcharts, { SeriesAreaOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Chip } from '../../../components/Chip';
import { getRadioCellQoSStats } from '../../../services/qos';
import { QoSType, QoSTypes } from '../../../types/filters';
import { QUERY } from '../../../utils/query';
import { ErrorFetchData } from '../../shared/Chart/ErrorFetchData';
import { LoadingData } from '../../shared/Chart/LoadingData';
import { NoData } from '../../shared/Chart/NoData';
import { chartOptions } from '../../shared/Chart/options';
import { styles } from '../../shared/Chart/styles';
import { formatCurrentTime, getFormattedData } from '../../shared/Chart/utils';
import { CircularProgress } from '../../shared/CircularProgress';
import { Switcher } from '../../shared/Switcher';

type ChartProps = {
    cellId: string;
};

type FormatterColors = {
    historical: string;
    prediction: string;
    accuracy: string;
};

export const formatterColors: FormatterColors = {
    historical: '#ffa81c',
    prediction: '#4f438e',
    accuracy: '#1fb208',
};

type DatasetId = keyof FormatterColors;

export const Chart = ({ cellId }: ChartProps) => {
    const [criteria, setCriteria] = useState<QoSType>(QoSTypes.HO_REQ);

    const {
        data: statData,
        isFetching,
        isLoading,
        isError,
        refetch,
    } = useQuery(
        [QUERY.CELL_QoS.GET_STATS, criteria],
        () => getRadioCellQoSStats(cellId, criteria),
        {
            enabled: !!cellId,
            refetchInterval: 60000,
        },
    );

    const getMaxValue = useMemo(() => {
        let max = 0;
        statData?.historicalData?.forEach(value => {
            if (value.value >= max) {
                max = value.value;
            }
        });
        statData?.predictionData?.forEach(value => {
            if (value.value >= max) {
                max = value.value;
            }
        });
        return Math.ceil(max + max * 0.2);
    }, [statData?.historicalData, statData?.predictionData]);

    const getHistoricalData = useCallback((): SeriesAreaOptions['data'] => {
        return getFormattedData(statData?.historicalData, 'historical');
    }, [statData?.historicalData]);

    const getPredictionData = useCallback((): SeriesAreaOptions['data'] => {
        return getFormattedData(statData?.predictionData, 'prediction');
    }, [statData?.predictionData]);

    const getPredictionAccuracyData = useCallback((): SeriesAreaOptions['data'] => {
        return getFormattedData(statData?.predictionAccuracy, 'accuracy');
    }, [statData?.predictionAccuracy]);

    const options: Highcharts.Options = {
        chart: chartOptions.chart,
        boost: chartOptions.boost,
        credits: chartOptions.credits,
        accessibility: chartOptions.accessibility,
        title: chartOptions.title,
        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            floating: true,
            useHTML: true,
            symbolWidth: 0,
            symbolHeight: 0,
            maxHeight: 60,
            x: -70,
            y: -20,
            labelFormatter: function () {
                const name = this.name;
                const color = this.color;
                const capsuleStyle = `<div style='display: inline-block;
                                                         width: 20px; height: 6px;
                                                         background-color: ${color}; 
                                                         border-radius: 3px; 
                                                         margin-right: 10px;'></div>`;
                return `${capsuleStyle}${name}`;
            },
        },
        xAxis: {
            lineColor: 'transparent',
            tickColor: 'transparent',
            tickInterval: 15 * 1000 * 60,
            type: 'datetime',
            dateTimeLabelFormats: chartOptions.dateTimeLabelFormats,
            labels: {
                style: {
                    color: '#4f438e',
                    fontSize: '10px',
                },
                formatter: function () {
                    if (typeof this.value === 'number') {
                        // const formattedTime = Highcharts.dateFormat('%l:%M%p', this.value);
                        // return formattedTime.toLowerCase();
                        return formatInTimeZone(
                            this.value,
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            'hh:mm a',
                        ).toLowerCase();
                    }
                    return '';
                },
            },
            plotLines: [
                {
                    value: new Date().getTime(),
                    width: 2,
                    color: 'red',
                    zIndex: 5,
                    label: {
                        text: `Current Time (${formatCurrentTime()})`,
                        align: 'left',
                        useHTML: true,
                        style: {
                            color: 'gray',
                            fontWeight: 'bold',
                            fontSize: '10px',
                            backgroundColor: '#fff',
                            padding: '1px',
                        },
                        x: 5,
                        y: 5,
                    },
                },
            ],
        },
        yAxis: [
            {
                title: {
                    text: '',
                },
                min: 0,
                max: getMaxValue,
                labels: {
                    format: `{text} ${criteria === 'LATENCY' ? 'ms' : 'mbps'}`,
                    style: {
                        color: '#4f438e',
                        fontSize: '10px',
                    },
                },
                gridLineColor: '#4f438e',
                gridLineWidth: 0,
                plotLines: [
                    {
                        value: 155,
                        width: 1,
                        color: '#FFFFFF',
                        zIndex: 4,
                        dashStyle: 'Dash',
                        label: {
                            text: 'defined limit',
                            style: {
                                color: '#4f438e',
                                fontSize: '10px',
                            },
                        },
                    },
                ],
            },
            {
                title: {
                    text: '',
                },
                endOnTick: false,
                min: 0,
                max: 100,
                tickInterval: 20,
                opposite: true,
                gridLineWidth: 0,
                labels: {
                    format: `{value} %`,
                    style: {
                        color: '#4f438e',
                        fontSize: '10px',
                    },
                },
            },
        ],
        tooltip: {
            useHTML: true,
            backgroundColor: 'rgba(247, 246, 252, 1)',
            outside: true,
            borderColor: 'transparent',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                width: 6,
                color: '#00000029',
            },
            shape: 'rect',
            formatter: function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const datasetId: DatasetId = this.point.custom.datasetId;
                const color = formatterColors[datasetId];
                const isAccuracy = datasetId === 'accuracy';
                const suffix = isAccuracy ? '%' : criteria === 'LATENCY' ? 'ms' : 'mbps';
                const formattedTime = formatInTimeZone(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    this.point.custom.time,
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    'LLL dd, yyy hh:mm a',
                );

                const valueWithSuffix = isAccuracy
                    ? `${this.y}${suffix}`
                    : `${this.y} <span style='font-size: 12px;'>${suffix}</span>`;

                return `<p style='text-align: center; margin: 0; color: ${color};
                                            font-size: 16px; font-weight: bold;'>
                        ${valueWithSuffix}
                     </p>
                     <p style='text-align: center; margin: 4px 0 0 0; color: ${color};
                      font-size: 12px;'>
                        ${formattedTime}
                     </p>`;
            },
        },
        plotOptions: {
            bubble: {
                sizeBy: 'area',
                minSize: 10,
                maxSize: 20,
                color: 'transparent',
                marker: {
                    lineColor: '#FF9900',
                    fillColor: '#FF9900B3',
                },
                cursor: 'pointer',
                opacity: 0.9,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
            },
            area: {
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
            },
        },
        series: [
            {
                name: 'Actual',
                type: 'area',
                color: '#ffa81c',
                data: getHistoricalData(),
                marker: {
                    enabled: false,
                },
                zones: [
                    {
                        value: 100,
                        color: '#ffa81c',
                        fillColor: '#fff5e5',
                    },
                    {
                        color: '#FFFFFF',
                        fillColor: '#fffa2e',
                    },
                ],
                opacity: 0.9,
                states: {
                    inactive: {
                        opacity: 0.4,
                    },
                },
            },
            {
                name: 'Prediction',
                type: 'area',
                color: '#4f438e',
                data: getPredictionData(),
                marker: {
                    enabled: false,
                },
                zones: [
                    {
                        value: 100,
                        color: '#4f438e',
                        fillColor: '#ebe1db',
                    },
                    {
                        color: '#FFFFFF',
                        fillColor: '#A0CAC8',
                    },
                ],
                opacity: 0.7,
                states: {
                    inactive: {
                        opacity: 0.4,
                    },
                },
            },
            {
                name: 'Accuracy',
                type: 'line',
                color: '#1fb208',
                yAxis: 1,
                data: getPredictionAccuracyData(),
                marker: {
                    enabled: false,
                },
                zones: [
                    {
                        value: 100,
                        color: '#1fb208',
                        fillColor: '#d6ffae',
                    },
                    {
                        color: '#FFFFFF',
                        fillColor: '#A0CAC8',
                    },
                ],
                opacity: 0.7,
                states: {
                    inactive: {
                        opacity: 0.2,
                    },
                },
            },
        ],
    };

    const renderContent = () => {
        if (isLoading || isFetching) {
            return <LoadingData />;
        }

        const isDataEmpty = () => {
            return (
                (!statData?.historicalData || statData?.historicalData.length === 0) &&
                (!statData?.predictionData || statData?.predictionData.length === 0)
            );
        };

        if (isError) {
            if (!isLoading && !isFetching) {
                return <ErrorFetchData refetch={refetch} />;
            }
        } else if (isDataEmpty()) {
            return <NoData />;
        } else {
            return (
                <>
                    <CircularProgress value={statData?.averageAccuracy ?? 0} />
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </>
            );
        }
    };

    const filters = [
        {
            value: QoSTypes.HO_REQ,
        },
        {
            value: QoSTypes.HO_SUCCESS,
        },
        {
            value: QoSTypes.QOSFLOW_PDCP_UL,
        },
        {
            value: QoSTypes.QOSFLOW_PDCP_DL,
        },
    ];
    return (
        <Box sx={styles.chartPageWrapper}>
            <Box sx={styles.titleWrapper}>
                <Typography variant="h6" sx={styles.title}>
                    pci: {statData?.pci}
                </Typography>
                <Typography
                    sx={{
                        color: '#b6b5bd',
                    }}
                >
                    gnbDuId: {statData?.gnbDuId}
                </Typography>
                <Chip />
            </Box>
            <Box sx={styles.switcherWrapper}>
                <Switcher setCriteria={setCriteria} filters={filters} />
            </Box>
            {renderContent()}
        </Box>
    );
};
