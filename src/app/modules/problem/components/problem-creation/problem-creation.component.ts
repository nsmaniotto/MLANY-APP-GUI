import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnInputOutputEnum } from 'src/app/constants/columnInputOutput.enum';
import { ColumnTypeEnum } from 'src/app/constants/columnType.enum';
import { NavigationPathEnum } from 'src/app/constants/navigationPath.enum';
import { Dataset } from 'src/app/modules/dataset/models/dataset';
import { DatasetColumn } from 'src/app/modules/dataset/models/datasetColumn';
import { ModelInstance } from 'src/app/modules/model/models/modelInstance';
import { Problem, ProblemFieldMaxLength, ProblemFieldMinLength } from '../../models/problem';
import { ProblemSolving } from '../../models/problemSolving';
import { ProblemSolvingColumn } from '../../models/problemSolvingColumn';
import { ProblemService } from '../../services/problem.service';
import { ProblemSolvingService } from '../../services/problemSolving.service';

@Component({
  selector: 'app-problem-creation',
  templateUrl: './problem-creation.component.html',
  styleUrls: ['./problem-creation.component.css']
})
export class ProblemCreationComponent {
  private problem: Problem;

  private knownProblemSolvingColumns: ProblemSolvingColumn[];

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
    targetColumnType: new FormControl<ColumnTypeEnum | null>(
      null
    ),
    contextColumns: new FormControl<DatasetColumn[]>(
      [], Validators.required
    )
  });

  public problemSolvingFormGroup = this._formBuilder.group({
    problemSolving: new FormControl<ProblemSolving | null>(
      null, Validators.required
    ),
    modelToBeDeployed: new FormControl<ModelInstance | null>(
      null, Validators.required
    )
  });

  public secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly problemService: ProblemService,
    private readonly problemSolvingService: ProblemSolvingService,
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

  public startProblemSolving(): void {
    if (this.datasetSettingsFormGroup.valid) {
      const problemSolvingColumns: ProblemSolvingColumn[] = [];
      // Add target column
      problemSolvingColumns.push({
        ...this.datasetSettingsFormGroup.value.targetColumn,
        type: this.datasetSettingsFormGroup.value.targetColumnType as ColumnTypeEnum,
        inputOutput: ColumnInputOutputEnum.OUTPUT
      });
      // Add context columns
      this.datasetSettingsFormGroup.value.contextColumns?.forEach(contextColumn =>
        problemSolvingColumns.push({...contextColumn, inputOutput: ColumnInputOutputEnum.INPUT})
      );

      if (!this.areProblemSolvingColumnsSame(problemSolvingColumns, this.knownProblemSolvingColumns)) {
        this.knownProblemSolvingColumns = problemSolvingColumns;

        const problemSolving = new ProblemSolving();
        problemSolving.problemId = this.problem.id;
        problemSolving.datasetId = this.datasetSettingsFormGroup.value.dataset?.id;

        problemSolving.problemSolvingColumns = problemSolvingColumns;

        this.problemSolvingService.createProblemSolving(problemSolving).subscribe(value => {
          if (value) {
            this.problemSolvingFormGroup.patchValue({ problemSolving: value });
            this.problemSolvingFormGroup.patchValue({ modelToBeDeployed: null });
          }
        });
      }
    }
  }

  private areProblemSolvingColumnsSame(_arr1: ProblemSolvingColumn[], _arr2: ProblemSolvingColumn[]) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      || _arr1.length !== _arr2.length
      ) {
        return false;
      }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
            return false;
        }
    }

    return true;
  }

  public markDatasetSettingsFormGroupTouched(): void {
    this.datasetSettingsFormGroup.controls.targetColumn.markAsTouched();
    this.datasetSettingsFormGroup.controls.contextColumns.markAsTouched();
  }

  public handleDatasetSettingsFormChange(formGroup: FormGroup): void {
    this.datasetSettingsFormGroup = formGroup;
  }

  public markProblemSolvingFormGroupTouched(): void {
    this.problemSolvingFormGroup.controls.problemSolving.markAsTouched();
    this.problemSolvingFormGroup.controls.modelToBeDeployed.markAsTouched();
  }

  public handleProblemSolvingFormChange(formGroup: FormGroup): void {
    this.problemSolvingFormGroup = formGroup;
  }
}
