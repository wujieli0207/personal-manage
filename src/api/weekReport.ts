import {
  GetWeekReportParams,
  EditWeekReport,
  WeekReport,
} from "./model/weekReportModel";
import { ResultRo } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GET_WEEK_REPORT = "/api/week-report/getWeekReport",
  CREATE_WEEK_REPORT = "/api/week-report/create",
  UPDATE_WEEK_REPORT = "/api/week-report/update",
  REMOVE_WEEK_REPORT = "/api/week-report/remove",
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

/**
 *
 * @description 根据年份查询周报告数据
 */
export const createWeekReportApi = (id: number, params: EditWeekReport) => {
  return defHttp.post<WeekReport>(
    { url: `${Api.UPDATE_WEEK_REPORT}/${id}`, params },
    { errorMessageMode: "none" }
  );
};

/**
 *
 * @description 根据年份查询周报告数据
 */
export const editWeekReportApi = (id: number, params: EditWeekReport) => {
  return defHttp.post<WeekReport>(
    { url: `${Api.UPDATE_WEEK_REPORT}/${id}`, params },
    { errorMessageMode: "none" }
  );
};

/**
 *
 * @description 根据年份查询周报告数据
 */
export const removeWeekReportApi = (id: number) => {
  return defHttp.post<WeekReport>(
    { url: `${Api.REMOVE_WEEK_REPORT}/${id}` },
    { errorMessageMode: "none" }
  );
};
