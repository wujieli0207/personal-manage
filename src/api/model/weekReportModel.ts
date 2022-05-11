export interface GetWeekReportParams {
  year: number;
  pageSize: number;
  currentPage: number;
}

export interface WeekReportList {
  id: number;
  title: string;
  workDayPomo: number;
  restDayPomo: number;
  workoutTimes: number;
  averageSleepHour: string;
  startDate: Date;
  endDate: Date;
}
