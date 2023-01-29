export interface ModelTrainingResult {
  id: number;
  meanScore: number;
  standardDeviation: number;
  trainingAccuracy: number;
  validationAccuracy: number;
  averagePredictionTimeMs: number;
}
