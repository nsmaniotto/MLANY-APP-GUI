import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelInstance } from 'src/app/modules/model/models/modelInstance';
import { ModelTraining } from 'src/app/modules/model/models/modelTraining';
import { ProblemSolvingStatusEnum } from '../../constants/problemSolvingStatus.enum';
import { ProblemSolvingService } from '../../services/problemSolving.service';

@Component({
  selector: 'app-problem-solving-step-form',
  templateUrl: './problem-solving-step-form.component.html',
  styleUrls: ['./problem-solving-step-form.component.css']
})
export class ProblemSolvingStepFormComponent implements OnInit {
  private readonly PROBLEM_SOLVING_REFRESH_WAIT_TIME_MS = 1000;

  @Input() formGroup: FormGroup;
  @Output() onFormChange = new EventEmitter<FormGroup>();

  public isSolvingInProgress: boolean;

  public fastestModelId: number;
  public lightestModelId: number;
  public mostEfficientModelId: number;
  public mostStableModelId: number;

  constructor(
    private readonly problemSolvingService: ProblemSolvingService
  ) {}

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isSolvingInProgress = this.formGroup.value.problemSolving?.status === ProblemSolvingStatusEnum.IN_PROGRESS;

      if (this.isSolvingInProgress) {
        setTimeout(() => this.refreshProblemSolving(), this.PROBLEM_SOLVING_REFRESH_WAIT_TIME_MS);
      }

      this.onFormChange.emit(this.formGroup);
    });
  }

  private refreshProblemSolving(): void {
    this.problemSolvingService.getProblemSolving(this.formGroup.value.problemSolving.id).subscribe(problemSolving => {
      this.formGroup.patchValue({ problemSolving });

      this.refreshModelTrainingIcons();
    });
  }

  private refreshModelTrainingIcons(): void {
    if (this.formGroup.value.problemSolving.modelTrainings.length > 0) {
      // Refresh fastest model
      this.fastestModelId = this.formGroup.value.problemSolving.modelTrainings.sort(
        (a: ModelTraining, b: ModelTraining) =>
          this.compareUndefinedNumbers(a.modelTrainingResult?.averagePredictionTimeMs, b.modelTrainingResult?.averagePredictionTimeMs)
      )[0].id;

      // Refresh lightest model
      this.lightestModelId = this.formGroup.value.problemSolving.modelTrainings.sort(
        (a: ModelTraining, b: ModelTraining) =>
          this.compareNumbers(a.modelInstance.fileInfo.byteSize, b.modelInstance.fileInfo.byteSize, true)
      )[0].id;

      // Refresh most efficient model
      this.mostEfficientModelId = this.formGroup.value.problemSolving.modelTrainings.sort(
        (a: ModelTraining, b: ModelTraining) =>
          this.compareUndefinedNumbers(a.modelTrainingResult?.meanScore, b.modelTrainingResult?.meanScore)
      )[0].id;

      // Refresh most stable model
      this.mostStableModelId = this.formGroup.value.problemSolving.modelTrainings.sort(
        (a: ModelTraining, b: ModelTraining) =>
          this.compareUndefinedNumbers(a.modelTrainingResult?.standardDeviation, b.modelTrainingResult?.standardDeviation, true)
      )[0].id;
    }
  }

  private compareUndefinedNumbers(a: number | undefined, b: number | undefined, reverse = false): number {
    if (a === undefined && b === undefined) {
      return 0;
    } else if (a === undefined || b === undefined) {
      if (a === undefined) {
        return reverse ? 1 : -1;
      } else {
        return reverse ? -1 : 1;
      }
    } else {
      return this.compareNumbers(a ,b , reverse);
    }
  }

  private compareNumbers(a: number, b: number , reverse: boolean) {
    return reverse ? a - b : b - a;
  }

  public deploy(modelToBeDeployed: ModelInstance) {
    this.formGroup.patchValue({ modelToBeDeployed });
  }
}
