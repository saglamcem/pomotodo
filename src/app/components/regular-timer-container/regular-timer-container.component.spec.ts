import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularTimerContainerComponent } from './regular-timer-container.component';
import { RegularTimerComponent } from '../regular-timer/regular-timer.component';
import { RegularTimerSeconds, RegularTimerStateEnum } from '../../shared/util/regular/regular-timer-state';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegularTimerContainerComponent', () => {
  let component: RegularTimerContainerComponent;
  let fixture: ComponentFixture<RegularTimerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegularTimerContainerComponent,
        RegularTimerComponent
      ]
    })
    .compileComponents();
  }));

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

  it(`shouldn't render the timer component if the seconds value is unset`, () => {
    component.remainingSeconds = undefined;
    fixture.detectChanges();

    const timerContainerDom: DebugElement = fixture.debugElement;
    const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

    expect(regularTimerComponent).toBeFalsy();
  });

  it(`shouldn't render the timer component if the state value is unset`, () => {
    component.currentState = undefined;
    fixture.detectChanges();

    const timerContainerDom: DebugElement = fixture.debugElement;
    const regularTimerComponent = timerContainerDom.query(By.directive(RegularTimerComponent));

    expect(regularTimerComponent).toBeFalsy();
  });

  it('should have the right class if current state is "counting break time"', () => {
    component.currentState = RegularTimerStateEnum.COUNTING_BREAK_TIME;
    const timerContainerDom: HTMLElement = fixture.debugElement.nativeElement;
    const containerElm = timerContainerDom.querySelector('.regular-timer-container');
    fixture.detectChanges();
    expect(containerElm.classList).toContain('is-rest-time');
  });

  it('should set timer correctly', () => {
    const ninetySeconds = 90;
    component.setTimer(ninetySeconds);
    expect(component.remainingSeconds).toEqual(ninetySeconds);
  });

  it('should set state correctly', () => {
    const countingState = RegularTimerStateEnum.COUNTING;
    const stoppedState = RegularTimerStateEnum.STOPPED;

    component.setState(countingState);
    expect(component.currentState).toEqual(countingState);

    component.setState(stoppedState);
    expect(component.currentState).toEqual(stoppedState);
  });

  it('should know when to give a long/short break', () => {
    let doneCounterMock = 3;
    component.doneCounter = doneCounterMock;

    // getBreakTimer is a private method, and so is called like this
    expect(component['getBreakTimer']()).toEqual(RegularTimerSeconds.SHORT_BREAK_TIME);

    doneCounterMock++;
    component.doneCounter = doneCounterMock;

    // getBreakTimer is a private method, and so is called like this
    expect(component['getBreakTimer']()).toEqual(RegularTimerSeconds.LONG_BREAK_TIME);
  })
});
