import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemCreationFormComponent } from './components/problem-creation-form/problem-creation-form.component';
import { ProblemViewComponent } from './containers/problem-view/problem-view.component';
import { ProblemListComponent } from './containers/problem-list/problem-list.component';
import { ProblemSolvingFormComponent } from './components/problem-solving-form/problem-solving-form.component';
import { ProblemSolvingComponent } from './containers/problem-solving/problem-solving.component';
import { ProblemCreationComponent } from './components/problem-creation/problem-creation.component';


const routes: Routes = [
 {
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
    }, {
      path: 'view/:id',
      component: ProblemViewComponent
    }, {
      path: 'create',
      component: ProblemCreationComponent
    }, {
      path: 'createform',
      component: ProblemCreationFormComponent
    }, {
      path: 'list',
      component: ProblemListComponent
    }, {
      path: 'solve',
      component: ProblemSolvingFormComponent
    }, {
      path: 'solving/:id',
      component: ProblemSolvingComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemRoutingModule {}
