import { ModelTraining } from '../../model/models/modelTraining';
import { ProblemSolvingStatusEnum } from '../constants/problemSolvingStatus.enum';

export interface ProblemSolving {
  id: number;
  problemId: number;
  datasetId: number;
  status: ProblemSolvingStatusEnum;
  modelTrainings: ModelTraining[];
}
