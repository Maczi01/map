export const chartOptions = {
    chart: {
        height: 570,
        width: 1200,
        backgroundColor: '#ffffff',
        marginTop: 70,
        zooming: {
            type: 'x' as Highcharts.OptionsChartZoomingTypeValue, // Explicitly type 'x'
            resetButton: {
                theme: {
                    fill: '#fff',
                    stroke: '#fff',
                    style: {
                        fontSize: '12px',
                        color: '#FF9900',
                        border: '1px solid #FF9900',
                        marginBottom: '50px',
                    },
                },
            },
        },
    },
    boost: {
        enabled: true,
        useGPUTranslations: true,
    },
    credits: {
        enabled: false,
    },
    accessibility: {
        enabled: false,
    },
    title: {
        text: '',
    },
    dateTimeLabelFormats: {
        millisecond: '%l:%M%p',
        second: '%l:%M%p',
        minute: '%l:%M%p',
        hour: '%l:%M%p',
        day: '%l:%M%p',
        week: '%l:%M%p',
        month: '%l:%M%p',
        year: '%l:%M%p',
    },
};
