import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';
import { RegularTimerSeconds, RegularTimerStateEnum } from '../../shared/util/regular/regular-timer-state';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set timer correctly', () => {
    const ninetySeconds = 90;
    service.setTimer(ninetySeconds);
    expect(service.remainingSeconds).toEqual(ninetySeconds);
  });

  it('should set state correctly', () => {
    const countingState = RegularTimerStateEnum.COUNTING;
    const stoppedState = RegularTimerStateEnum.STOPPED;

    service.setState(countingState);
    expect(service.currentState).toEqual(countingState);

    service.setState(stoppedState);
    expect(service.currentState).toEqual(stoppedState);
  });

  it('should know when to give a long/short break', () => {
    let doneCounterMock = 3;
    service.setDoneCounter(doneCounterMock);

    expect(service['isTimeForLongBreak']()).toEqual(false);

    doneCounterMock++;
    service.setDoneCounter(doneCounterMock);

    expect(service['isTimeForLongBreak']()).toEqual(true);
  });

  it('should get break timer correctly', () => {
    let doneCounterMock = 3;
    service.setDoneCounter(doneCounterMock);

    expect(service['getBreakTimer']()).toEqual(RegularTimerSeconds.SHORT_BREAK_TIME);

    doneCounterMock++;
    service.setDoneCounter(doneCounterMock);

    expect(service['getBreakTimer']()).toEqual(RegularTimerSeconds.LONG_BREAK_TIME);
  });
});
