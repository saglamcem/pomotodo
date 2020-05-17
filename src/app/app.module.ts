import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegularTimerComponent } from './components/regular-timer/regular-timer.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { MaterialModule } from "./shared/material/material.module";
import { RegularTimerContainerComponent } from './components/regular-timer-container/regular-timer-container.component';

@NgModule({
  declarations: [
    AppComponent,
    RegularTimerContainerComponent,
    RegularTimerComponent,
    TodoContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
