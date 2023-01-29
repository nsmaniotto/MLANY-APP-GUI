import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/modules/problem/models/problem';
import { ProblemService } from 'src/app/modules/problem/services/problem.service';
import { Dataset } from '../../models/dataset';
import { DatasetService } from '../../services/dataset.service';
import * as fromDataset from '../../reducers/dataset';
import * as datasetActions from '../../actions/dataset';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css']
})
export class DatasetViewComponent implements OnInit {
  private datasetId: number;
  dataset: Dataset = new Dataset();
  form: FormGroup;
  isDatasetLoaded: boolean;

  problemSuggestions: Problem[] = [];

  constructor(
    private readonly datasetService: DatasetService,
    private readonly formBuilder: FormBuilder,
    private readonly problemService: ProblemService,
    private readonly route: ActivatedRoute,
    private readonly storeDataset: Store<fromDataset.State>
  ) {}

  ngOnInit() {
    this.initDataset();
    this.initForm();
    this.loadProblemSuggestions();
  }

  initDataset() {
    this.route.params.subscribe(params => {
      this.datasetId = Number(params.id);
      this.getDataset();
    });
  }

  getDataset() {
    this.datasetService.getDataset(this.datasetId).subscribe(value => {
      if (value) {
        this.dataset = value;
        this.isDatasetLoaded = true;
        this.form.patchValue(this.dataset);
      }
    });
  }

  initForm() {
    this.form  = this.formBuilder.group({
      linkedProblemId: this.formBuilder.control(this.dataset?.linkedProblemId)
    });

    this.form.valueChanges.pipe(map(() => {
      if (this.form.dirty && this.form.valid) {
        this.saveDataset();
      }
    })
    ).subscribe();
  }

  loadProblemSuggestions() {
    this.problemService.getProblems().subscribe(value => {
      if (value) {
        this.problemSuggestions = value;
      }
    });
  }

  saveDataset() {
    const newDatasetValue: Dataset = Object.assign({}, this.dataset, this.form.value);
    this.storeDataset.dispatch(new datasetActions.SaveDataset(newDatasetValue));
  }
}


