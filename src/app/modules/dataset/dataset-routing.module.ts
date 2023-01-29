import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetListComponent } from './containers/dataset-list/dataset-list.component';
import { DatasetViewComponent } from './containers/dataset-view/dataset-view.component';


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
      component: DatasetViewComponent
    }, {
      path: 'list',
      component: DatasetListComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetRoutingModule {}
