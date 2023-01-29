import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';
import { DatasetContentInfoAnalysisStatusEnum } from '../../constants/datasetContentInfoAnalysisStatus.enum';
import { DatasetColumn } from '../../models/datasetColumn';
import { DatasetColumnCorrelation } from '../../models/datasetColumnCorrelation';
import { DatasetService } from '../../services/dataset.service';

@Component({
  selector: 'app-dataset-settings-step-form',
  templateUrl: './dataset-settings-step-form.component.html',
  styleUrls: ['./dataset-settings-step-form.component.css']
})
export class DatasetSettingsStepFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() onFormChange = new EventEmitter<FormGroup>();

  public columnTypeSuggestions: ColumnTypeEnum[] = [];

  public isAnalysisInProgress: boolean;

  constructor(
    private readonly datasetService: DatasetService
  ) {}

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isAnalysisInProgress = this.formGroup.value.dataset?.datasetContentInfo.analysisStatus === DatasetContentInfoAnalysisStatusEnum.IN_PROGRESS;

      if (this.isAnalysisInProgress) {
        setTimeout(() => this.refreshDataset(), 1000);
      }

      this.onFormChange.emit(this.formGroup);
    });

    this.loadColumnTypeSuggestions();
  }

  private refreshDataset(): void {
    this.datasetService.getDataset(this.formGroup.value.dataset.id).subscribe(dataset => {
      this.formGroup.patchValue({ dataset });
    });
  }

  private loadColumnTypeSuggestions(): void {
    this.datasetService.getDatasetColumnTypes().subscribe(suggestions => {
      this.columnTypeSuggestions = suggestions;
    });
  }

  public getCorrelationWithTargetColumn(column: DatasetColumn): number | null {
    const matchedColumnCorrelations: DatasetColumnCorrelation[] = this.formGroup.value.targetColumn?.correlations.filter(
      (columnCorrelation: DatasetColumnCorrelation) => columnCorrelation.secondColumnId === column.id
    );
    return matchedColumnCorrelations && matchedColumnCorrelations.length > 0 ? matchedColumnCorrelations[0].correlation : null;
  }
}
