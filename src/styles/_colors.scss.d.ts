// Type declaration to be able to import scss variables as typescript variables
interface ColorsScss {
  primary: string;
  primary_dark: string;
  secondary: string;
  secondary_dark: string;
  success: string;
  success_dark: string;
  info: string;
  info_dark: string;
  warning: string;
  warning_dark: string;
  error: string;
  error_dark: string;

  box_background: string;
}

export const colors: ColorsScss;

export default colors;