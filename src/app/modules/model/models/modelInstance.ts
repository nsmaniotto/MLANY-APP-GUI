import { FileInfo } from 'src/app/models/fileInfo';
import { Model } from './model';

export interface ModelInstance {
  id: number;
  model: Model;
  fileInfo: FileInfo;
}
