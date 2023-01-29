import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/modules/problem/models/problem';
import { ProblemService } from 'src/app/modules/problem/services/problem.service';
import { Dataset } from '../../models/dataset';
import { DatasetService } from '../../services/dataset.service';
import * as fromDataset from '../../reducers/dataset';
import * as datasetActions from '../../actions/dataset';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dataset-table',
  templateUrl: './dataset-table.component.html',
  styleUrls: ['./dataset-table.component.css']
})
export class DatasetTableComponent implements OnInit {
  datasets: Dataset[] = [];
  problemSuggestions: Problem[] = [];
  displayedColumns: string[] = ['id', 'filePath', 'fileName', 'problem','action'];

  constructor(
    private readonly datasetService: DatasetService,
    private readonly problemService: ProblemService,
    private readonly storeDataset: Store<fromDataset.State>
  ) {}

  ngOnInit() {
    this.loadDatasets();
    this.loadProblemSuggestions();
  }

  loadDatasets() {
    this.datasetService.getDatasets().subscribe(value => {
      if (value) {
        this.datasets = value;
      }
    });
  }

  loadProblemSuggestions() {
    this.problemService.getProblems().subscribe(value => {
      if (value) {
        this.problemSuggestions = value;
      }
    });
  }

  linkedProblemChange(dataset: Dataset, event: { value : number }) {
    const newDatasetValue: Dataset = Object.assign({}, dataset);
    newDatasetValue.linkedProblemId = event.value;
    this.storeDataset.dispatch(new datasetActions.SaveDataset(newDatasetValue));
  }
}


