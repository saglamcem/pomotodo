import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RegularTimerContainerComponent } from './components/regular-timer-container/regular-timer-container.component';
import { RegularTimerComponent } from './components/regular-timer/regular-timer.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragDropModule
      ],
      declarations: [
        AppComponent,
        RegularTimerContainerComponent,
        RegularTimerComponent,
        TodoContainerComponent
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
