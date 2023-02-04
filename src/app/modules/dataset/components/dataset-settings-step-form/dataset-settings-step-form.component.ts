import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  private readonly DATASET_REFRESH_WAIT_TIME_MS = 1000;
  public readonly CONTEXT_SELECTION_COLUMN_DEFINITION = 'contextSelection';
  public readonly CORRELATION_COLUMN_DEFINITION = 'correlation';
  public readonly NAME_COLUMN_DEFINITION = 'name';
  public readonly EMPTY_VALUE_COUNT_COLUMN_DEFINITION = 'emptyValueCount';

  @Input() formGroup: FormGroup;
  @Output() onFormChange = new EventEmitter<FormGroup>();

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.datasetColumnsTableDataSource.sort = sort;
  }

  public columnTypeSuggestions: ColumnTypeEnum[] = [];

  public isAnalysisInProgress: boolean;
  private lastKnownDatasetId: number;

  public displayedColumns: string[] = [
    this.CONTEXT_SELECTION_COLUMN_DEFINITION, this.CORRELATION_COLUMN_DEFINITION, this.NAME_COLUMN_DEFINITION, this.EMPTY_VALUE_COUNT_COLUMN_DEFINITION
  ];
  public datasetColumnsTableDataSource = new MatTableDataSource<DatasetColumn>();

  public isContextColumnsListDirty = false;

  constructor(
    private readonly datasetService: DatasetService
  ) {}

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isAnalysisInProgress = this.formGroup.value.dataset?.datasetContentInfo.analysisStatus === DatasetContentInfoAnalysisStatusEnum.IN_PROGRESS;
      const hasDatasetChanged = this.lastKnownDatasetId !== this.formGroup.value.dataset?.id;

      if (this.isAnalysisInProgress) {
        setTimeout(() => this.refreshDataset(), this.DATASET_REFRESH_WAIT_TIME_MS);
      }

      if (!this.isAnalysisInProgress && hasDatasetChanged) {
        this.datasetColumnsTableDataSource.data = this.formGroup.value.dataset?.datasetContentInfo.columns;
        this.lastKnownDatasetId = this.formGroup.value.dataset?.id;
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

  public clearTargetColumnType(): void {
    this.formGroup.patchValue({ targetColumnType: null });
  }

  public clearContextColumns(): void {
    this.formGroup.patchValue({ contextColumns: [] });
    this.isContextColumnsListDirty = false;
  }

  private loadColumnTypeSuggestions(): void {
    this.datasetService.getDatasetColumnTypes().subscribe(suggestions => {
      this.columnTypeSuggestions = suggestions;
    });
  }

  public onSortDatasetColumnsTable(sort: Sort): void {
    let data: DatasetColumn[] = [...this.datasetColumnsTableDataSource.data];
    if (sort.active && sort.direction !== '') {
      data = data.sort((a: DatasetColumn, b: DatasetColumn) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case this.CONTEXT_SELECTION_COLUMN_DEFINITION:
                  return this.compare(this.formGroup.value.contextColumns.indexOf(a), this.formGroup.value.contextColumns.indexOf(b), isAsc);
                case this.CORRELATION_COLUMN_DEFINITION:
                  return this.compare(this.getCorrelationWithTargetColumn(a), this.getCorrelationWithTargetColumn(b), isAsc);
                default:
                  return 0;
            }
        });
    }
    this.datasetColumnsTableDataSource.data = data;
  }

  private compare(a: number, b: number, isAsc: boolean): number {
    let comparisonValue = 1;
    let directionValue = -1;

    if (a < b) {
      comparisonValue = -1;
    }

    if (isAsc) {
      directionValue = 1;
    }

    return comparisonValue * directionValue;
  }

  public onDatasetColumnContextToggle(datasetColumn: DatasetColumn, event: MatSlideToggleChange): void {
    let contextColumns: DatasetColumn[] = this.formGroup.value.contextColumns;

    this.isContextColumnsListDirty = true;

    if (event.checked) {
      // Add column to context
      contextColumns.push(datasetColumn);
    } else {
      // Remove column from context
      contextColumns = contextColumns.filter(column => column.id !== datasetColumn.id);
    }

    this.formGroup.patchValue({ contextColumns });
  }

  public isInContextColumns(datasetColumn: DatasetColumn): boolean {
    return this.formGroup.value.contextColumns.indexOf(datasetColumn) !== -1;
  }

  public getCorrelationWithTargetColumn(column: DatasetColumn): number {
    const matchedColumnCorrelation: DatasetColumnCorrelation = this.formGroup.value.targetColumn?.correlations.find(
      (columnCorrelation: DatasetColumnCorrelation) => columnCorrelation.secondColumnId === column.id
    );
    return matchedColumnCorrelation?.correlation;
  }
}
