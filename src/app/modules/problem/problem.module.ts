import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGaugeModule } from 'ngx-gauge';
import { MaterialModule } from 'src/app/material/material.module';
import { DatasetImportButton } from '../dataset/components/dataset-import-button.component/dataset-import-button.component';
import { DatasetSettingsStepFormComponent } from '../dataset/components/dataset-settings-step-form/dataset-settings-step-form.component';
import { ModelTrainingCard } from '../model/components/model-training-card/model-training-card.component';
import { ProblemCreateButton } from './components/problem-create-button/problem-create-button.component';
import { ProblemCreationFormComponent } from './components/problem-creation-form/problem-creation-form.component';
import { ProblemCreationComponent } from './components/problem-creation/problem-creation.component';
import { ProblemDetailsComponent } from './components/problem-details/problem-details.component';
import { ProblemInitializationStepFormComponent } from './components/problem-initialization-step/problem-initialization-step-form.component';
import { ProblemSolveButtonComponent } from './components/problem-solve-button/problem-solve-button.component';
import { ProblemSolvingFormComponent } from './components/problem-solving-form/problem-solving-form.component';
import { ProblemSolvingStepFormComponent } from './components/problem-solving-step-form/problem-solving-step-form.component';
import { ProblemTableComponent } from './components/problem-table/problem-table.component';
import { ProblemListComponent } from './containers/problem-list/problem-list.component';
import { ProblemSolvingComponent } from './containers/problem-solving/problem-solving.component';
import { ProblemViewComponent } from './containers/problem-view/problem-view.component';
import { ProblemRoutingModule } from './problem-routing.module';

@NgModule({
  declarations: [
    DatasetImportButton,
    ProblemCreateButton,
    ProblemCreationComponent,
    ProblemCreationFormComponent,
    ProblemDetailsComponent,
    ProblemListComponent,
    ProblemSolveButtonComponent,
    ProblemSolvingComponent,
    ProblemSolvingFormComponent,
    ProblemTableComponent,
    ProblemViewComponent,
    /* Problem Creation step components */
    ProblemInitializationStepFormComponent,
    DatasetSettingsStepFormComponent,
    ProblemSolvingStepFormComponent,
    ModelTrainingCard
    /* -------------------------------- */
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProblemRoutingModule,
    NgxGaugeModule,
    //SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    //EffectsModule.forFeature([ProblemEffect])
  ]
})
export class ProblemModule {}
