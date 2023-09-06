import moment from 'moment';

type Props = {
  date: string | Date;
  format?: 'slash' | 'slashWithTime';
};

const formats = {
  slash: 'DD/MM/YYYY',
  slashWithTime: 'DD/MM/YYYY HH:mm'
};

export const formatDate = ({ date, format = 'slash' }: Props) => {
  return moment(date).format(formats[format]);
};
