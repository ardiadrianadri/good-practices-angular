interface Column {
  title: string;
  field: string;
}

export interface TableConfiguration {
  columns: Column[];
  pageSize?: number[];
  initialSize?: number;
}
