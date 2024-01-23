export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    profileWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: 240,
    },
    avatarBox: {
        width: 50,
        paddingLeft: '25px',
        paddingTop: '5px',
    },
    avatarInitials: {
        fontSize: '14px',
        fontFamily: '"Lato"',
        fontWeight: 'bold',
        width: '30px',
        height: '30px',
    },
    iconWrapper: { margin: '0 10px' },
    headerIconsBlock: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatarWrapper: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '16px 10px 0',
    },
    avatarTextDetails: {
        color: 'text.primary',
        fontSize: '12px',
        fontWeight: 'bold',
        marginTop: '-4px',
        paddingTop: '0px',
    },
    avatarIconDetails: {
        marginBottom: '1px',
    },
    selectButton: {
        '&:before': {
            borderBottom: 'none',
        },
        '&:after': {
            borderBottom: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
        '& .MuiSelect-icon': {
            display: 'none',
        },
    },
    selectItemWrapper: { display: 'flex', alignItems: 'center' },
    selectItemIcon: { mr: 1, fontSize: '20px' },
};
