import { Box } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { ROUTE } from '../../routes/routes';
import { getRadioCellQoSList } from '../../services/qos';
import { QUERY } from '../../utils/query';
import { RadioCellList } from '../shared/RadioCellList';
import { OverviewMap } from './OverviewMap';
import { styles } from './styles';

export const QoSMap = () => {
    const { data, isFetching, isLoading, isError, refetch } = useQuery({
        queryKey: [QUERY.CELL_QoS.GET_ALL],
        queryFn: getRadioCellQoSList,
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
                redirectLink={ROUTE.QoS_GRAPH}
            />
            <OverviewMap
                radioCellsList={radioCellsList}
                selectedRadioCell={selectedRadioCell}
                setSelectedRadioCell={setSelectedRadioCell}
            />
        </Box>
    );
};
