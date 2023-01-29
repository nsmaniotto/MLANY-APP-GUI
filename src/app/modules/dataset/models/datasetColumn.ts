import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';

export class DatasetColumn {
  id: number;
  datasetContentInfoId: number;
  name: string;
  type: ColumnTypeEnum;
  inputOutput: ColumnInputOutputEnum;
  emptyValueCount: number;
}
