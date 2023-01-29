import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyContainerComponent } from './containers/dummy-container/dummy-container.component';


const routes: Routes = [
 {
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
    },
    {
      path: 'list',
      component: DummyContainerComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyRoutingModule {}
