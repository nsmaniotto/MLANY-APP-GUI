import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DummyListComponent } from './components/dummy-list/dummy-list.component';
import { DummyContainerComponent } from './containers/dummy-container/dummy-container.component';
import { DummyRoutingModule } from './dummy-routing.module';

@NgModule({
  declarations: [
    DummyContainerComponent,
    DummyListComponent
  ],
  imports: [
    CommonModule,
    DummyRoutingModule,
    //SharedModule,
    ReactiveFormsModule,
    FormsModule,
    //MaterialModule,
    //EffectsModule.forFeature([DummyEffect])
  ]
})
export class DummyModule {}
