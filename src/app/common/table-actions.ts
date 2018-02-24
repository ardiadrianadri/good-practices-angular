import { TableTypeActions } from './table-type-actions';

export interface TableActions {
  type: TableTypeActions;
  payload: any;
}
