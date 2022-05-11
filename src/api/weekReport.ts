import { GetWeekReportParams, WeekReportList } from "./model/weekReportModel";
import { ResultRo } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GET_WEEK_REPORT = "/api/week-report/getWeekReport",
}

/**
 *
 * @description 根据年份查询周报告数据
 */
export const getWeekReportApi = (params: GetWeekReportParams) => {
  return defHttp.post<ResultRo<WeekReportList>>(
    { url: Api.GET_WEEK_REPORT, params },
    { errorMessageMode: "none" }
  );
};
