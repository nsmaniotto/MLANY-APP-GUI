import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProblemEffect } from './modules/problem/effects/problem';
import { RouterEffects } from './effects/goEffects';
import { DatasetEffect } from './modules/dataset/effects/dataset';
import { ProblemSolvingEffect } from './modules/problem/effects/problemSolving';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopBarComponent
  ],
  imports: [
    /* NgRx */
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      DatasetEffect,
      ProblemEffect,
      ProblemSolvingEffect,
      RouterEffects
    ]),

    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
