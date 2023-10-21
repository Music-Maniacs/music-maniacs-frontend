import React, { MutableRefObject } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

type Props = {
  label?: string;
  clearable?: boolean;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
  minDate?: string;
  maxDate?: string;
};

export const SearchInputDatePicker = ({ label, clearable = true, queryParams, paramKey, minDate, maxDate }: Props) => {
  const onChange = (value: string | null) => {
    const valueFormatted = value ? moment(value).format('YYYY-MM-DD') : '';

    queryParams.current[paramKey] = valueFormatted;
  };

  return (
    <DatePicker
      label={label}
      sx={{ width: '100%' }}
      slotProps={{ textField: { size: 'small', variant: 'filled' }, field: { clearable } }}
      onChange={onChange}
      // @ts-ignore
      defaultValue={moment(queryParams.current[paramKey]).utc() ?? ''}
      // @ts-ignore
      minDate={minDate ? moment(minDate).utc() : ''}
      // @ts-ignore
      maxDate={maxDate ? moment(maxDate).utc() : ''}
    />
  );
};
