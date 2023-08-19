import colors from '../styles/_colors.scss';

type ReturnProps = {
  $bg: string;
  $bgDark: string;
};

export function getColorVariant(
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'info' | 'warning'
): ReturnProps {
  const colorsMap = {
    primary: {
      $bg: colors.primary,
      $bgDark: colors.primary_dark
    },
    secondary: {
      $bg: colors.secondary,
      $bgDark: colors.secondary_dark
    },
    tertiary: {
      $bg: colors.tertiary,
      $bgDark: colors.tertiary_dark
    },
    success: {
      $bg: colors.success,
      $bgDark: colors.success_dark
    },
    error: {
      $bg: colors.error,
      $bgDark: colors.error_dark
    },
    info: {
      $bg: colors.info,
      $bgDark: colors.info_dark
    },
    warning: {
      $bg: colors.warning,
      $bgDark: colors.warning_dark
    }
  };

  return colorsMap[color ?? 'primary'];
}
