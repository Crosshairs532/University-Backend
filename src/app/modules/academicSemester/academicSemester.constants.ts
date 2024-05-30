import { Code, Month, Name, TCodeChekcer } from './academicSemester.interface';

export const Months: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
];

export const Names: Name[] = ['Autumn', 'Summer', 'Fall'];
export const Codes: Code[] = ['01', '02', '03'];
export const codeChecker: TCodeChekcer = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
