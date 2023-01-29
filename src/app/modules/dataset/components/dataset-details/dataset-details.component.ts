import { Component, Input, OnInit } from '@angular/core';
import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';
import { Dataset } from '../../models/dataset';
import { DatasetColumn } from '../../models/datasetColumn';
import { DatasetService } from '../../services/dataset.service';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {
  @Input() dataset: Dataset;
  columnTypeSuggestions: ColumnTypeEnum[] = [];
  columnInputOutputAnswers: ColumnInputOutputEnum[] = [];

  constructor(
    private readonly datasetService: DatasetService
  ) {}
  ngOnInit() {
    this.loadColumnTypeSuggestions();
    this.loadColumnInputOutputAnswers();
  }

  loadColumnTypeSuggestions() {
    this.datasetService.getDatasetColumnTypes().subscribe(suggestions => {
      this.columnTypeSuggestions = suggestions;
    });
  }

  loadColumnInputOutputAnswers() {
    this.datasetService.getDatasetColumnInputOutputAnswers().subscribe(answers => {
      this.columnInputOutputAnswers = answers;
    });
  }

  columnTypeChange(datasetColumn: DatasetColumn, event: { value: ColumnTypeEnum }) {
      const newDatasetColumnValue: DatasetColumn = Object.assign({}, datasetColumn);
      newDatasetColumnValue.type = event.value;
      this.saveDatasetColumn(newDatasetColumnValue);
  }

  columnInputOutputChange(datasetColumn: DatasetColumn, event: { value: ColumnInputOutputEnum }) {
      const newDatasetColumnValue: DatasetColumn = Object.assign({}, datasetColumn);
      newDatasetColumnValue.inputOutput = event.value;
      this.saveDatasetColumn(newDatasetColumnValue);
  }

  saveDatasetColumn(datasetColumn: DatasetColumn) {
    this.datasetService.saveDatasetColumn(datasetColumn).subscribe(value => {
      const updateItem = this.dataset.datasetContentInfo.columns.find(el => el.id === datasetColumn.id);
      if (updateItem) {
        const index = this.dataset.datasetContentInfo.columns.indexOf(updateItem);
        this.dataset.datasetContentInfo.columns[index] = value;
      }
    });
  }
}


