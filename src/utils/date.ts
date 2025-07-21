import { format } from 'date-fns';

export const dateToTimeStringFormatter = (date: Date) => format(date, 'H:mm');
export const dateToStringFormatter = (date: Date) => format(date, 'yyyy-MM-dd');
