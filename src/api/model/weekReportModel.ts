export interface GetWeekReportParams {
  year: number;
  pageSize: number;
  currentPage: number;
}

export interface WeekReport {
  id: number | string;
  title: string;
  workDayPomo: number | string;
  restDayPomo: number | string;
  workoutTimes: number | string;
  averageSleepHour: string;
  startDate: Date | string;
  endDate: Date | string;
}

export interface EditWeekReport extends Omit<WeekReport, "id"> {}
