export const styles = {
    labelActive: {
        textAlign: 'left',
        fontSize: '0.75rem',
        fontFamily: '"Lato"',
        color: '#FFFFFF !important',
        opacity: '1',
        '& span': {
            color: 'primary.contrastText',
        },
    },
    labelTextSideBar: {
        textAlign: 'left',
        fontSize: '0.75rem',
        fontFamily: '"Lato"',
        color: '#FFFFFF',
        opacity: '1',
    },
    activeNavItem: {
        height: '2.5rem',
        backgroundColor: 'primary.light',
        padding: '8px 45px 8px 21px',
        borderLeft: '4px solid #FFFFFF!important',
        color: '#FFFFFF !important',
        '& svg, span': {
            color: '#FFFFFF !important',
        },
    },
    navItems: {
        cursor: 'pointer',
        height: '2.5rem',
        padding: '8px 25px 8px 25px',
        '&:hover, &.MuiTouchRipple-root': {
            color: '#FFFFFF !important',
            '& svg, span': {
                color: '#FFFFFF !important',
            },
            backgroundColor: 'primary.light',
        },
        '& svg, span': {
            color: '#FFFFFF !important',
        },
    },
    listMenu: {
        height: '500px',
    },
    menuWrapper: {
        width: { sm: '240px' },
        flexShrink: { sm: 0 },
    },
    drawerContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        marginTop: '30px',
    },
    footerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 5px',
    },
    footerText: {
        color: 'text.secondary',
        padding: '10px 55px',
        textAlign: 'center',
        fontSize: '0.75rem',
    },
    logoImageWrapper: {
        margin: '0 auto',
        width: '220px',
    },
    itemButton: {
        height: '2.5rem',
    },
    itemIcon: {},
};
