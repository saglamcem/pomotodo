import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RegularTimerContainerComponent } from './components/regular-timer-container/regular-timer-container.component';
import { RegularTimerComponent } from './components/regular-timer/regular-timer.component';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { MaterialModule } from './shared/material/material.module';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        RegularTimerContainerComponent,
        RegularTimerComponent,
        TaskContainerComponent,
        TaskItemComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pomotodo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pomotodo');
  });
});
