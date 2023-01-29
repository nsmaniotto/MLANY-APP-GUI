import { FileInfo } from 'src/app/models/fileInfo';
import { ModelTrainingStatusEnum } from '../constants/modelTrainingStatus.enum';
import { ModelInstance } from './modelInstance';
import { ModelTrainingResult } from './modelTrainingResult';

export interface ModelTraining {
  id: number;
  problemSolvingId: number;
  modelInstance: ModelInstance;
  vectorizerFileInfo: FileInfo;
  status: ModelTrainingStatusEnum;
  modelTrainingResult?: ModelTrainingResult;
}
