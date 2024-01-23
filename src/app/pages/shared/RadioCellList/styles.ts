export const styles = {
    listWrapper: {
        width: 400,
    },
    listTitle: {
        fontWeight: 'bold',
        color: 'common.black',
        padding: '0 5px',
        borderBottom: '2px solid #b6b5bd',
        display: 'block',
        textAlign: 'justify',
    },
    listStack: {
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '10px',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100vh - 50px)',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c0bfbf',
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#a9a9a9',
            },
        },
    },
    mapPageWrapper: { display: 'flex', flexDirection: 'row', zIndex: 9999 },
    emptyListMessage: {
        color: '#b6b5bd',
        margin: '0 auto',
    },
    errorWrapper: {
        width: 400,
        minHeight: '100px',
        margin: 0,
        borderBottom: '2px solid #b6b5bd',
        boxShadow: 'none',
        backgroundColor: '#FFF',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: 'common.black',
    },
    gnbDuId: {
        color: '#b6b5bd',
    },
    detailsButton: { width: '120px' },
    loaderWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 400,
        minHeight: '100px',
        borderBottom: '2px solid #b6b5bd',
        boxShadow: 'none',
    },
    stackWrapper: { margin: '20px 10px' },
    buttonLoader: { width: '120px', margin: '20px 20px 20px 10px' },
    cardsLoaderWrapper: { display: 'flex', flexDirection: 'column' },
};
