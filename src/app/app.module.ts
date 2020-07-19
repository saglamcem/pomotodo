import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./shared/material/material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegularTimerComponent } from './components/regular-timer/regular-timer.component';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { RegularTimerContainerComponent } from './components/regular-timer-container/regular-timer-container.component';
import { TaskItemComponent } from './components/todo-item/task-item.component';
import { TaskInputComponent } from './components/task-input/task-input.component';

@NgModule({
  declarations: [
    AppComponent,
    RegularTimerContainerComponent,
    RegularTimerComponent,
    TaskContainerComponent,
    TaskItemComponent,
    TaskInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
