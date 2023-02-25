import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModelTrainingStatusEnum } from '../../constants/modelTrainingStatus.enum';
import { ModelInstance } from '../../models/modelInstance';
import { ModelTraining } from '../../models/modelTraining';

@Component({
  selector: 'app-model-training-card',
  templateUrl: './model-training-card.component.html',
  styleUrls: ['./model-training-card.component.css']
})
export class ModelTrainingCard {
  @Input() set modelTraining(modelTraining: ModelTraining) {
    this._modelTraining = modelTraining;
    this.refreshPerformance();
  }
  @Input() isFastest: boolean;
  @Input() isLightest: boolean;
  @Input() isMostEfficient: boolean;
  @Input() isMostStable: boolean;
  @Input() isModelToBeDeployed: boolean;

  @Output() onDeploy = new EventEmitter<ModelInstance>();

  public _modelTraining: ModelTraining;
  public performance: number;
  public performanceCategory = "Accuracy";
  public performanceStandardDeviation: number;

  public IN_PROGRESS_STATUS = ModelTrainingStatusEnum.IN_PROGRESS;
  public FINISHED_STATUS = ModelTrainingStatusEnum.FINISHED;
  public FAILED_STATUS = ModelTrainingStatusEnum.FAILED;

  public gaugeSize = 120;
  public gaugeThick = 7;

  private refreshPerformance(): void {
    this.performance = this._modelTraining.modelTrainingResult?.meanScore ? this._modelTraining.modelTrainingResult?.meanScore * 100 : 0;
    this.performanceStandardDeviation = this._modelTraining.modelTrainingResult?.standardDeviation ? this._modelTraining.modelTrainingResult?.standardDeviation * 100 : 0;
  }

  public deployModel() {
    this.onDeploy.emit(this._modelTraining.modelInstance);
  }
}


