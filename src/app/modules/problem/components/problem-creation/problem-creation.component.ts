import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { NavigationPathEnum } from 'src/app/constants/navigationPath.enum';
import { Dataset } from 'src/app/modules/dataset/models/dataset';
import { DatasetColumn } from 'src/app/modules/dataset/models/datasetColumn';
import { Problem, ProblemFieldMaxLength, ProblemFieldMinLength } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'app-problem-creation',
  templateUrl: './problem-creation.component.html',
  styleUrls: ['./problem-creation.component.css']
})
export class ProblemCreationComponent {
  private problem: Problem;

  public problemInitializationFormGroup = this._formBuilder.group({
    name: new FormControl<string | undefined>(undefined,
      [
        Validators.required,
        Validators.minLength(ProblemFieldMinLength.NAME),
        Validators.maxLength(ProblemFieldMaxLength.NAME)
      ]
    ),
    dataset: [
      new FormControl(new Dataset(),
        [
          Validators.required
        ]
      )
    ]
  });

  public datasetSettingsFormGroup = this._formBuilder.group({
    dataset: [
      new FormControl<Dataset | null>(null,
        [
          Validators.required
        ]
      )
    ],
    targetColumn: new FormControl<DatasetColumn | null>(
      null, Validators.required
    ),
    targetColumnType: new FormControl<string>(
      ''
    ),
    contextColumns: new FormControl<DatasetColumn[]>(
      [], Validators.required
    )
  });

  public secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly problemService: ProblemService,
    private readonly router: Router
  ) {}

  public cancelProblemCreation(): void {
    this.router.navigate([NavigationPathEnum.PROBLEM]);
  }

  public saveProblem(): void {
    const updatedProblem = this.problem ? this.problem : new Problem();

    if (this.problemInitializationFormGroup.valid) {
      updatedProblem.name = this.problemInitializationFormGroup.value.name as string;
      updatedProblem.linkedDatasetIds = [this.problemInitializationFormGroup.value.dataset?.id as number];

      this.problemService.save(updatedProblem).subscribe(value => {
        if (value) {
          this.problem = value;
        }
      });
    }
  }

  public handleProblemInitializationFormChange(formGroup: FormGroup): void {
    this.problemInitializationFormGroup = formGroup;
    this.handleProblemInitializationDatasetChange();
  }

  private handleProblemInitializationDatasetChange(): void {
    this.datasetSettingsFormGroup.patchValue({ dataset: this.problemInitializationFormGroup.value.dataset });

    if (this.datasetSettingsFormGroup.value.dataset?.datasetContentInfo.columns) {
      const targetColumn = this.problemInitializationFormGroup.value.dataset?.datasetContentInfo.columns.find(
        datasetColumn => datasetColumn.inputOutput === ColumnInputOutputEnum.OUTPUT
      );

      this.datasetSettingsFormGroup.patchValue({ targetColumn });
    }
  }

  public markDatasetSettingsFormGroupTouched(): void {
    this.datasetSettingsFormGroup.controls.targetColumn.markAsTouched();
    this.datasetSettingsFormGroup.controls.contextColumns.markAsTouched();
  }

  public handleDatasetSettingsFormChange(formGroup: FormGroup): void {
    this.datasetSettingsFormGroup = formGroup;
  }
}
