export interface FetchParams {
  serchInfo?: Recordable;
  page?: number;
  sorInof?: Recordable;
  filterInfo?: Recordable;
}

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>;
}
