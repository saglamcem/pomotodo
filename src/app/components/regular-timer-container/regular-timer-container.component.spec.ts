import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegularTimerContainerComponent } from './regular-timer-container.component';
import { RegularTimerComponent } from '../regular-timer/regular-timer.component';
import { RegularTimerStateEnum } from '../../shared/util/regular/regular-timer-state';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimerService } from '../../services/timer/timer.service';

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
    const serviceNextSpy = spyOn(timerService['_seconds'], 'next');
    timerService.setTimer(undefined);
    expect(serviceNextSpy).toHaveBeenCalled();

    component.remainingSeconds$.toPromise()
      .then(val => {
        expect(val).toBeTruthy()

        fixture.detectChanges();

        const timerContainerDom: DebugElement = fixture.debugElement;
        const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

        expect(regularTimerComponent).toBeFalsy();
      })
      .catch(err => {
        console.error(err);
      });
  }));

  it(`shouldn't render the timer component if the state value is unset`, async(() => {
    const nextSpy = spyOn(timerService['_state'], 'next');
    timerService.setState(undefined);
    expect(nextSpy).toHaveBeenCalled();
    expect(component.currentState$).toHaveBeenCalled();

    fixture.detectChanges();

    const timerContainerDom: DebugElement = fixture.debugElement;
    const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

    expect(regularTimerComponent).toBeFalsy();
  }));

  // it('should have the right class if current state is "counting break time"', () => {
  //   const nextSpy = spyOn(timerService['_state'], 'next');
  //   timerService.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);
  //   expect(nextSpy).toHaveBeenCalled();
  //
  //   fixture.detectChanges();
  //
  //   const timerContainerDom: HTMLElement = fixture.debugElement.nativeElement;
  //   const containerElm = timerContainerDom.querySelector('.regular-timer-container');
  //   expect(containerElm.classList).toContain('is-rest-time');
  // });
  //
  // it('should have the right class if current state is "counting break time"', fakeAsync(() => {
  //   const nextSpy = spyOn(timerService['_state'], 'next');
  //   timerService.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);
  //   expect(nextSpy).toHaveBeenCalled();
  //
  //   fixture.detectChanges(); // onInit()
  //   // sync spy errors immediately after init
  //
  //   tick(1000); // flush the component's setTimeout()
  //
  //   fixture.detectChanges(); // update errorMessage within setTimeout()
  //
  //   const timerContainerDom: HTMLElement = fixture.debugElement.nativeElement;
  //   const containerElm = timerContainerDom.querySelector('.regular-timer-container');
  //
  //   expect(containerElm.classList).toContain('is-rest-time');
  // }));
});
