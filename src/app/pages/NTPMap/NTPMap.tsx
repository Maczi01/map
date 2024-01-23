import { Box } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { ROUTE } from '../../routes/routes';
import { getRadioCellNTPList } from '../../services/ntp';
import { QUERY } from '../../utils/query';
import { RadioCellList } from '../shared/RadioCellList';
import { OverviewMap } from './OverviewMap';
import { styles } from './styles';

export const NTPMap = () => {
    const { data, isFetching, isLoading, isError, refetch } = useQuery({
        queryKey: [QUERY.CELL_NTP.GET_ALL],
        queryFn: getRadioCellNTPList,
    });

    const radioCellsList = data?.radioCells || [];

    const [selectedRadioCell, setSelectedRadioCell] = useState('');

    return (
        <Box sx={styles.mapPageWrapper}>
            <RadioCellList
                radioCellsList={radioCellsList}
                selectedRadioCell={selectedRadioCell}
                setSelectedRadioCell={setSelectedRadioCell}
                isFetching={isFetching}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                redirectLink={ROUTE.NTP_GRAPH}
            />
            <OverviewMap
                radioCellsList={radioCellsList}
                selectedRadioCell={selectedRadioCell}
                setSelectedRadioCell={setSelectedRadioCell}
            />
        </Box>
    );
};
