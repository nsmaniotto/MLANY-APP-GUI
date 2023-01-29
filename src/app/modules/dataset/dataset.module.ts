import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { DatasetDetailsComponent } from './components/dataset-details/dataset-details.component';
import { DatasetFileUploadComponent } from './components/dataset-file-upload.component/dataset-file-upload.component';
import { DatasetTableComponent } from './components/dataset-table/dataset-table.component';
import { DatasetListComponent } from './containers/dataset-list/dataset-list.component';
import { DatasetViewComponent } from './containers/dataset-view/dataset-view.component';
import { DatasetRoutingModule } from './dataset-routing.module';

@NgModule({
  declarations: [
    DatasetDetailsComponent,
    DatasetFileUploadComponent,
    DatasetListComponent,
    DatasetTableComponent,
    DatasetViewComponent
  ],
  imports: [
    CommonModule,
    DatasetRoutingModule,
    //SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    //EffectsModule.forFeature([DatasetEffect])
  ]
})
export class DatasetModule {}
