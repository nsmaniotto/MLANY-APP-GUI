import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';

export interface ProblemSolvingColumn {
  id: number;
  problemSolvingId: number;
  name: string;
  type: ColumnTypeEnum;
  inputOutput: ColumnInputOutputEnum;
}
