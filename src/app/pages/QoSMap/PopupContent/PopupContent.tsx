import { Box, Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Chip } from '../../../components/Chip';
import { ROUTE } from '../../../routes/routes';
import { getRadioCellQoSDetails } from '../../../services/qos';
import { QUERY } from '../../../utils/query';
import { Error } from './Error';
import { Loader } from './Loader';
import { styles } from './styles';

type PopupContentProps = {
    cellId: string;
};

export const PopupContent = ({ cellId }: PopupContentProps) => {
    const navigate = useNavigate();

    const roundValue = (num: number | undefined) => {
        if (!num) return 0;
        return Math.round(num * 1000) / 1000;
    };

    const {
        data: cellDetails,
        isFetching,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: [QUERY.CELL_QoS.GET_ONE],
        queryFn: () => getRadioCellQoSDetails(cellId),
    });
    const loading = isFetching || isLoading;
    if (isError && !loading) {
        return <Error refetch={refetch} />;
    }
    if (loading) {
        return <Loader />;
    }

    return (
        <Box sx={styles.popupWrapper} data-testid="markerPopupContent">
            <Typography sx={styles.popupTitle}>pci: {cellDetails?.pci}</Typography>
            <Typography sx={styles.gnbDuId}>gnbDuId: {cellDetails?.gnbDuId}</Typography>
            <Chip />
            <Box sx={styles.infoBox}>
                <Box sx={styles.uplinkAndDownLinkWrapper}>
                    <Typography sx={styles.uplinkAndDownLink}>QoS score</Typography>
                    <Typography sx={styles.percentValueInfo}>
                        {roundValue(cellDetails?.qosScore)}
                    </Typography>
                </Box>
                <Box sx={styles.uplinkAndDownLinkWrapper}>
                    <Typography sx={styles.uplinkAndDownLink}>QoS flow PdcpUl</Typography>
                    <Typography sx={styles.percentValueInfo}>
                        {roundValue(cellDetails?.qosflowPdcpUl)}
                    </Typography>
                </Box>
                <Box sx={styles.uplinkAndDownLinkWrapper}>
                    <Typography sx={styles.uplinkAndDownLink}>QoS flow PdcpDl</Typography>
                    <Typography sx={styles.percentValueInfo}>
                        {roundValue(cellDetails?.qosflowPdcpDl)}
                    </Typography>
                </Box>
                <Box sx={styles.uplinkAndDownLinkWrapper}>
                    <Typography sx={styles.uplinkAndDownLink}>Ho Req</Typography>
                    <Typography sx={styles.percentValueInfo}>
                        {roundValue(cellDetails?.hoReq)}
                    </Typography>
                </Box>
                <Box sx={styles.uplinkAndDownLinkWrapper}>
                    <Typography sx={styles.uplinkAndDownLink}>Ho Success</Typography>
                    <Typography sx={styles.percentValueInfo}>
                        {roundValue(cellDetails?.hoSuccess)}
                    </Typography>
                </Box>
            </Box>
            <Box sx={styles.buttonBox}>
                <Button
                    onClick={() => navigate(`${ROUTE.QoS_GRAPH}/${cellId}`)}
                    sx={styles.detailsButton}
                >
                    See details
                </Button>
            </Box>
        </Box>
    );
};
