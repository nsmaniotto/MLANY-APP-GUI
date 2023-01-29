import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';
import { Store } from '@ngrx/store';
import * as fromProblem from '../../reducers/problem';
import * as problemActions from '../../actions/problem';

@Component({
  selector: 'app-problem-creation-form',
  templateUrl: './problem-creation-form.component.html',
  styleUrls: ['./problem-creation-form.component.css']
})
// TODO: component to be replaced by ProblemCreationComponent steps
export class ProblemCreationFormComponent implements OnInit {
  form: FormGroup;

  nameFieldMinLength = 5;
  nameFieldMaxLength = 50;

  typeSuggestions: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly problemService: ProblemService,
    private readonly storeProblem: Store<fromProblem.State>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': [
        null,
        [
          Validators.required,
          Validators.minLength(this.nameFieldMinLength),
          Validators.maxLength(this.nameFieldMaxLength)
        ]
      ],
      'type': [null, Validators.required]
    });

    this.loadTypeSuggestions();
  }

  loadTypeSuggestions() {
    this.problemService.getProblemTypeLabels().subscribe(suggestions => {
      this.typeSuggestions = suggestions;
    });
  }

  createProblem(newProblem: Problem) {
    this.storeProblem.dispatch(new problemActions.CreateProblem(newProblem));
  }
}


