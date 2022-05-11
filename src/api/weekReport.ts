import { GetWeekReportParams, WeekReport } from "./model/weekReportModel";
import { ResultRo } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GET_WEEK_REPORT = "/api/week-report/getWeekReport",
}

/**
 *
 * @description 根据年份查询周报告数据
 */
export const getWeekReportByYearApi = (params: GetWeekReportParams) => {
  return defHttp.post<ResultRo<WeekReport>>(
    { url: Api.GET_WEEK_REPORT, params },
    { errorMessageMode: "none" }
  );
};

/**
 *
 * @description 根据年份查询周报告数据
 */
export const getWeekReportByIdApi = (id: number) => {
  return defHttp.get<WeekReport>(
    { url: `${Api.GET_WEEK_REPORT}/${id}` },
    { errorMessageMode: "none" }
  );
};
