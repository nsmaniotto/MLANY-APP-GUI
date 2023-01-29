import { DatasetContentInfoAnalysisStatusEnum } from "../constants/datasetContentInfoAnalysisStatus.enum";
import { DatasetColumn } from "./datasetColumn";

export interface DatasetContentInfo {
  id: number;
  analysisStatus: DatasetContentInfoAnalysisStatusEnum;
  lineCount: number;
  columns: DatasetColumn[];
}
