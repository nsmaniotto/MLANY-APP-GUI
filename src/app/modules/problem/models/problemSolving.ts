import { ModelTraining } from '../../model/models/modelTraining';
import { ProblemSolvingStatusEnum } from '../constants/problemSolvingStatus.enum';
import { ProblemSolvingColumn } from './problemSolvingColumn';

export class ProblemSolving {
  id: number;
  problemId: number;
  datasetId?: number;
  problemSolvingColumns: ProblemSolvingColumn[];
  status: ProblemSolvingStatusEnum;
  modelTrainings: ModelTraining[];
}
