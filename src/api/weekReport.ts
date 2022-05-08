import { WeekReportList } from "./model/weekReportModel";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GET_WEEK_REPORT = "/api/week-report/getWeekReport",
}

/**
 *
 * @description 根据年份查询周报告数据
 */
export const getWeekReportApi = (year: number) => {
  return defHttp.get<WeekReportList>(
    { url: `${Api.GET_WEEK_REPORT}/${year}` },
    { errorMessageMode: "none" }
  );
};
