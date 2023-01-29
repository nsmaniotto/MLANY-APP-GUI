import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dummy',
    loadChildren: () => import('./modules/dummy/dummy.module').then((m) => m.DummyModule)
  },
  {
    path: 'problem',
    loadChildren: () => import('./modules/problem/problem.module').then((m) => m.ProblemModule)
  },
  {
    path: 'dataset',
    loadChildren: () => import('./modules/dataset/dataset.module').then((m) => m.DatasetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
