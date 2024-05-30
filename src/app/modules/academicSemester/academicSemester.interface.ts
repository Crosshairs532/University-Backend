export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'November'
  | 'December';

export type Code = '01' | '02' | '03';
export type Name = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemester = {
  name: Name;
  code: Code;
  year: string;
  startMonth: Month;
  endMonth: Month;
};

export type TCodeChekcer = {
  [key: string]: string;
};
