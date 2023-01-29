import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';
import { Store } from '@ngrx/store';
import * as fromProblemSolving from '../../reducers/problemSolving';
import * as problemSolvingActions from '../../actions/problemSolving';
import { Dataset } from 'src/app/modules/dataset/models/dataset';
import { DatasetService } from 'src/app/modules/dataset/services/dataset.service';
import { ProblemSolving } from '../../models/problemSolving';

@Component({
  selector: 'app-problem-solving-form',
  templateUrl: './problem-solving-form.component.html',
  styleUrls: ['./problem-solving-form.component.css']
})
export class ProblemSolvingFormComponent implements OnInit {
  form: FormGroup;

  problemSuggestions: Problem[] = [];
  datasetSuggestions: Dataset[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly problemService: ProblemService,
    private readonly datasetService: DatasetService,
    private readonly storeProblemSolving: Store<fromProblemSolving.State>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      'problemId': [null, Validators.required],
      'datasetId': [null, Validators.required]
    });

    this.loadProblemSuggestions();
    this.loadDatasetSuggestions();
  }

  loadProblemSuggestions() {
    this.problemService.getProblems().subscribe(suggestions => {
      this.problemSuggestions = suggestions;
    });
  }

  loadDatasetSuggestions() {
    this.datasetService.getDatasets().subscribe(suggestions => {
      this.datasetSuggestions = suggestions;
    });
  }

  createProblemSolving(problemSolving: ProblemSolving) {
    this.storeProblemSolving.dispatch(new problemSolvingActions.CreateProblemSolving(problemSolving));
  }
}


