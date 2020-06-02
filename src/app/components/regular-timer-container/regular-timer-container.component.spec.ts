import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegularTimerContainerComponent } from './regular-timer-container.component';
import { RegularTimerComponent } from '../regular-timer/regular-timer.component';
import { RegularTimerStateEnum } from '../../shared/util/regular/regular-timer-state';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimerService } from '../../services/timer/timer.service';
import { skip } from 'rxjs/operators';

describe('RegularTimerContainerComponent', () => {
  let component: RegularTimerContainerComponent;
  let timerService: TimerService;
  let fixture: ComponentFixture<RegularTimerContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RegularTimerContainerComponent,
          RegularTimerComponent
        ]
      }).compileComponents();

      timerService = TestBed.inject(TimerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularTimerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the timer component', () => {
    const timerContainerDom: DebugElement = fixture.debugElement;
    const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));
    expect(regularTimerComponent).toBeTruthy();
  });

  it(`shouldn't render the timer component if the seconds value is unset`, async(() => {
    component.remainingSeconds$
      .pipe(
        skip(1)
      )
      .subscribe(
        seconds => {
          expect(seconds).toEqual(undefined);

          fixture.detectChanges();

          const timerContainerDom: DebugElement = fixture.debugElement;
          const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

          expect(regularTimerComponent).toBeFalsy();
        }
      );

    timerService.setTimer(undefined);
  }));

  it(`shouldn't render the timer component if the state value is unset`, async(() => {
    component.currentState$
      .pipe(
        skip(1)
      )
      .subscribe(
        state => {
          expect(state).toEqual(undefined);

          fixture.detectChanges();

          const timerContainerDom: DebugElement = fixture.debugElement;
          const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

          expect(regularTimerComponent).toBeFalsy();
        }
      );

    timerService.setState(undefined);
  }));

  it('should have the right class if current state is "counting break time"', () => {
    component.ngOnInit();
    timerService.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);

    fixture.detectChanges();

    const timerContainerDom: HTMLElement = fixture.debugElement.nativeElement;
    const containerElm = timerContainerDom.querySelector('.regular-timer-container');
    expect(containerElm?.classList?.toString()).toContain('is-rest-time');
  });
});

