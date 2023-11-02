import { createTheme } from '@mui/material';
import colors from './_colors.scss';
import { esES } from '@mui/material/locale';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const muiTheme = createTheme(
  {
    typography: {
      allVariants: {
        color: colors.text_color
      }
    },
    palette: {
      primary: {
        main: cssVar('--primary') || '#6c26ed'
      },
      secondary: {
        main: cssVar('--secondary') || '#d12eee'
      },
      text: {
        primary: cssVar('--text_color') || '#fff'
      }
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          sx: {
            color: colors.text_color
          }
        }
      },
      MuiTab: {
        defaultProps: {
          sx: {
            color: colors.text_color,
            '&.Mui-selected': {
              color: colors.text_color,
              fontWeight: 'bold'
            }
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          sx: {
            color: colors.text_color,
            backgroundColor: colors.dropdown_background
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          selectIcon: {
            color: colors.text_color
          }
        },
        defaultProps: {
          sx: {
            color: colors.text_color
          }
        }
      },
      MuiSkeleton: {
        defaultProps: {
          sx: {
            bgcolor: 'var(--highlight)'
          }
        }
      },
      // Text Input
      MuiFilledInput: {
        styleOverrides: {
          input: {
            color: colors.text_color
          },
          root: {
            backgroundColor: 'var(--highlight)',
            '&:before, &:after': {
              borderBottom: '2px solid var(--brandBorderColor)'
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--primary)'
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--primary)'
            }
          }
        }
      },

      // Date Picker
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: 'var(--text_color)',
            backgroundColor: 'var(--dropdown_background)'
          }
        }
      },
      MuiDayCalendar: {
        styleOverrides: {
          root: {
            color: colors.text_color
          },
          weekDayLabel: {
            color: colors.text_color
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: colors.text_color,
            fontWeight: 'semi-bold'
          }
        }
      }
    }
  },
  esES
);
