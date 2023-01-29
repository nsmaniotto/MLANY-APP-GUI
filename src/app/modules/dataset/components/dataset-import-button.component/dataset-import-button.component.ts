import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Dataset } from '../../models/dataset';
import { DatasetService } from '../../services/dataset.service';

@Component({
  selector: 'app-dataset-import-button',
  templateUrl: './dataset-import-button.component.html',
  styleUrls: ['./dataset-import-button.component.css']
})
export class DatasetImportButton {
  @Output() onUpload = new EventEmitter<Dataset>();
  @Output() onError = new EventEmitter<string>();

  @ViewChild('datasetInput', { static: false }) datasetInput: ElementRef;

  private selectedDatasetFiles?: FileList;
  private selectedDatasetFile?: File | null;
  errorMessage = '';
  dataset: Dataset;

  validExtensions: string[] = ['.xlsx', '.xls', '.csv'];

  constructor(
    private readonly datasetService: DatasetService
  ) {}

  public openFileSelector() {
    this.datasetInput.nativeElement.click();
  }

  public selectDatasetFile(event: any): void {
    this.errorMessage = '';

    this.selectedDatasetFiles = event.target.files;
    this.selectedDatasetFile = this.selectedDatasetFiles?.item(0);

    if (this.selectedDatasetFile) {
      const selectedDatasetFileExtension: string = this.selectedDatasetFile.name.substring(this.selectedDatasetFile.name.lastIndexOf('.'));
      if (this.validExtensions.indexOf(selectedDatasetFileExtension) < 0) {
        this.errorMessage = `Invalid file selected, valid files are of type ${this.validExtensions.toString()}`;
        this.onError.emit(this.errorMessage);
      } else {
        this.datasetService.uploadDataset(this.selectedDatasetFile).subscribe(result => {
          this.dataset = result;
          this.onUpload.emit(this.dataset);
        });
      }
    }
  }
}
