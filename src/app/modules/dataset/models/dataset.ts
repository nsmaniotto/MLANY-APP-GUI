import { FileInfo } from 'src/app/models/fileInfo';
import { DatasetContentInfo } from './datasetContentInfo';

export interface Dataset {
  id: number;
  fileInfo: FileInfo;
  datasetContentInfo: DatasetContentInfo;
  linkedProblemId: number;
}

export class Dataset implements Dataset {}
