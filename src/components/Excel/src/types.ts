import { JSON2SheetOpts, WritingOptions } from 'xlsx'

export interface JsonToSheet<T = any> {
  data: T[]
  header?: T
  filename?: string
  json2sheetOpts?: JSON2SheetOpts
  write2excelOpts?: WritingOptions
}
