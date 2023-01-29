import { environment } from './environment';

export const servicesUrl = {
  serviceUrl: environment.serviceUrl,

  dummyUrl: `${environment.serviceUrl}dummy`,
  modelTrainingUrl: `${environment.serviceUrl}model/training`,
  problemSolvingColumnUrl: `${environment.serviceUrl}problem/solving/column`,
  problemSolvingUrl: `${environment.serviceUrl}problem/solving`,
  problemUrl: `${environment.serviceUrl}problem`,
  datasetUrl: `${environment.serviceUrl}dataset`
};
