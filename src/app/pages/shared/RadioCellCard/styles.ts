export const styles = {
    cardWrapper: (selected: boolean) => ({
        width: 400,
        minHeight: '100px',
        margin: 0,
        borderBottom: '2px solid #b6b5bd',
        boxShadow: 'none',
        backgroundColor: selected ? '#e8e8e8' : '#FFF',
        '&:hover': {
            backgroundColor: '#e8e8e8',
            cursor: 'pointer',
        },
    }),
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '10px',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: 'common.black',
    },
    gnbDuId: {
        color: '#b6b5bd',
    },
    detailsButton: { width: '120px' },
};
