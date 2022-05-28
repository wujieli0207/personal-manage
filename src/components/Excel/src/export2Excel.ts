import * as xlsx from "xlsx";
import type { WorkBook } from "xlsx";
import { JsonToSheet } from "./types";

const { utils, writeFile } = xlsx;

const DEFAULT_FILE_NAME = "excel-list";

/**
 *
 * @description json 导出为 xlsx
 */
export function jsonToSheetXlsx<T = any>({
  data,
  header,
  filename = DEFAULT_FILE_NAME,
  json2sheetOpts = {},
  write2excelOpts = { bookType: "xlsx" },
}: JsonToSheet<T>) {
  const arrayData = [...data];

  if (header) {
    arrayData.unshift(header);
    json2sheetOpts.skipHeader = true;
  }

  const worksheet = utils.json_to_sheet(arrayData, json2sheetOpts);

  const workbook: WorkBook = {
    SheetNames: [filename],
    Sheets: {
      [filename]: worksheet,
    },
  };

  writeFile(workbook, `${filename}.xlsx`, write2excelOpts);
}
