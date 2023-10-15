// Type declaration to be able to import scss variables as typescript variables
interface ColorsScss {
  primary: string;
  primary_dark: string;
  primary_ligth: string;
  secondary: string;
  secondary_dark: string;
  tertiary: string;
  tertiary_dark: string;
  success: string;
  success_dark: string;
  info: string;
  info_dark: string;
  warning: string;
  warning_dark: string;
  error: string;
  error_dark: string;

  input_border: string;
  input_background: string;

  box_background: string;

  sweet_alert_background: string;

  text_color: string;

  dropdown_background: string;
}

export const colors: ColorsScss;

export default colors;
