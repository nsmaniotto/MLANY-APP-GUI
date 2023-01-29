import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dataset } from '../../models/dataset';
import { DatasetService } from '../../services/dataset.service';
import * as fromDataset from '../../reducers/dataset';
import * as datasetActions from '../../actions/dataset';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dataset-file-upload',
  templateUrl: './dataset-file-upload.component.html',
  styleUrls: ['./dataset-file-upload.component.css']
})
export class DatasetFileUploadComponent {
  selectedDatasetFiles?: FileList;
  selectedDatasetFile?: File | null;
  currentDatasetFile?: File;
  message = '';
  dataset: Dataset;

  validExtensions: string[] = new Array(".xlsx", ".xls", ".csv");

  datasetFileInfos?: Observable<any>;

  constructor(
    private readonly datasetService: DatasetService,
    private readonly storeDataset: Store<fromDataset.State>
  ) {}

  selectDatasetFile(event: any): void {
    this.message = '';

    this.selectedDatasetFiles = event.target.files;
    this.selectedDatasetFile = this.selectedDatasetFiles?.item(0);

    if (this.selectedDatasetFile) {
      const selectedDatasetFileExtension: string = this.selectedDatasetFile.name.substring(this.selectedDatasetFile.name.lastIndexOf('.'));
      if (this.validExtensions.indexOf(selectedDatasetFileExtension) < 0) {
        this.message = `Invalid file selected, valid files are of ${this.validExtensions.toString()} types.`;
      }
    }
  }

  upload(): void {
    if (this.selectedDatasetFiles) {
      const file: File | null = this.selectedDatasetFiles.item(0);

      if (file) {
        this.currentDatasetFile = file;

        this.storeDataset.dispatch(new datasetActions.UploadDataset(this.currentDatasetFile));
      }
    }
  }
}
