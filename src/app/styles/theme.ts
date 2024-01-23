import { createTheme } from '@mui/material';

export const colors = {
    primary: '#0d006d',
    primaryLight: '#261a7c',
    primaryDark: '#090048',
    primaryContrastText: '#FFFFFF',
    black: '#222222',
    white: '#FFFFFF',
    text: '#1f1378',
    secondary: '#FF9900',
    secondaryLight: '#FFB700',
    secondaryDark: '#CC7A00',
    secondaryContrastText: '#FFF',
};

export const theme = createTheme({
    palette: {
        common: {
            black: colors.black,
            white: colors.white,
        },
        primary: {
            main: colors.primary,
            light: colors.primaryLight,
            dark: colors.primaryDark,
        },
        secondary: {
            main: colors.secondary,
            light: colors.secondaryLight,
            dark: colors.secondaryDark,
            contrastText: colors.secondaryContrastText,
        },
        text: {
            primary: colors.text,
            secondary: colors.white,
        },
    },
    typography: {
        fontFamily: '"Lato", sans-serif',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    marginLeft: '240px',
                    height: 65,
                    backgroundColor: colors.white,
                    width: 'calc(100% - 240px)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.primary,
                    boxSizing: 'border-box',
                    width: '250px',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: colors.text,
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'text' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: colors.text,
                        color: colors.white,
                        borderRadius: 0,
                        height: '30px',
                        '&:hover': {
                            backgroundColor: colors.primaryDark,
                            color: colors.white,
                        },
                    },
                },
            ],
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    height: '18px',
                    width: '70px',
                    paddingRight: '8px',
                    margin: '5px 0',
                    backgroundColor: '#00a410',
                    color: colors.white,
                    borderRadius: '10px',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    alignItems: 'center',
                },
                label: {
                    padding: 'initial',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0',
                    border: 'none',
                },
            },
        },
    },
});
