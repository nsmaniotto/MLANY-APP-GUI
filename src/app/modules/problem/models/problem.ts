import { ModelTraining } from '../../model/models/modelTraining';
import { ProblemTypeEnum } from '../constants/problemType.enum';
import { ProblemSolving } from './problemSolving';

export interface Problem {
  id: number;
  name: string;
  type: ProblemTypeEnum;
  problemSolvings: ProblemSolving[];
  deployedModelFromTraining?: ModelTraining;
  endPoint?: string;
}

export enum ProblemFieldMinLength {
  NAME = 5
}

export enum ProblemFieldMaxLength {
  NAME = 50
}
