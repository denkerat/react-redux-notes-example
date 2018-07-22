import moment from 'moment';

export const DATE_FORMAT = 'YYYYMMDD';

export const getMoment = date => moment(date, DATE_FORMAT);
export const formatDate = momentDate => momentDate.format(DATE_FORMAT);
export const convertDate = date => moment(date).format(DATE_FORMAT);