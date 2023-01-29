import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';
import { servicesUrl } from 'src/environments/servicesUrl';
import { Dataset } from '../models/dataset';
import { DatasetColumn } from '../models/datasetColumn';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  constructor(private readonly http: HttpClient) {}

  uploadDataset(datasetFile: File) {
    const formData: FormData = new FormData();

    formData.append('file', datasetFile);

    return this.http.post<Dataset>(`${servicesUrl.datasetUrl}/upload`, formData);
  }

  saveDataset(dataset: Dataset) {
    return this.http.post<Dataset>(`${servicesUrl.datasetUrl}/save`, dataset);
  }

  getDataset(datasetId: number) {
    return this.http.get<Dataset>(`${servicesUrl.datasetUrl}/${datasetId}`);
  }

  getDatasets() {
    return this.http.get<Dataset[]>(`${servicesUrl.datasetUrl}`);
  }

  getDatasetFiles() {
    return this.http.get<any>(`${servicesUrl.datasetUrl}/files`);
  }

  getDatasetColumnTypes() {
    return this.http.get<ColumnTypeEnum[]>(`${servicesUrl.datasetUrl}/column/type`);
  }

  getDatasetColumnInputOutputAnswers() {
    return this.http.get<ColumnInputOutputEnum[]>(`${servicesUrl.datasetUrl}/column/input-output`);
  }

  saveDatasetColumn(datasetColumn: DatasetColumn) {
    return this.http.post<DatasetColumn>(`${servicesUrl.datasetUrl}/column/save/`, datasetColumn);
  }
}
