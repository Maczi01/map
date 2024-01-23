import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ROUTE } from '../../routes/routes';
import { Chart } from './Chart';
import { styles } from './styles';

export const NTPChart = () => {
    const params = useParams();
    return (
        <Box sx={styles.chartPageWrapper}>
            <Box sx={styles.breadcrumbWrapper}>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            title: 'NTP Overview',
                            url: ROUTE.MAIN,
                        },
                        {
                            title: 'NTP Cell prediction',
                        },
                    ]}
                />
            </Box>
            <Chart cellId={params.cellId || ''} />
        </Box>
    );
};
