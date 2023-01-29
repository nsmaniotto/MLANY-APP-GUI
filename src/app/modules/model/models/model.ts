import { ModelFamilyEnum } from "../constants/modelFamilyEnum";

export interface Model {
  id: number;
  name: string;
  className: string;
  family: ModelFamilyEnum;
}
