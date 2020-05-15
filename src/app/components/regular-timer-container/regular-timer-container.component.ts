import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  RegularTimerSeconds,
  RegularTimerState,
  RegularTimerStateEnum
} from '../../shared/util/regular/regular-timer-state';
import { EMPTY, merge, Subject, Subscription, timer } from 'rxjs';
import { mapTo, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'pomo-regular-timer-container',
  templateUrl: './regular-timer-container.component.html',
  styleUrls: ['./regular-timer-container.component.scss']
})
export class RegularTimerContainerComponent implements OnInit, OnDestroy {
  informationText: string = null;
  currentState: RegularTimerStateEnum = RegularTimerStateEnum.WAITING_TO_START;
  TimerState = RegularTimerState;

  startCounter$: Subject<any> = new Subject<any>();
  stopCounter$: Subject<any> = new Subject<any>();

  remainingSeconds: number = RegularTimerSeconds.WORK_TIME;

  doneCounter = 0;

  countdownSubscription: Subscription;
  secondsCountdown$ = timer(0, 1000)
    .pipe(
      tap(val => {
        if (!RegularTimerState.isWaitingToStart(this.currentState)) {
          this.remainingSeconds--;
        }

        if (this.remainingSeconds === 0) {
          if (RegularTimerState.isCounting(this.currentState)) {
            this.doneCounter++;
            this.informationText = 'Take a break, and relax';
            this.setTimer(this.getBreakTimer());
            this.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);
          }
          else if (RegularTimerState.isCountingBreakTime(this.currentState)) {
            this.informationText = 'Back to work!';
            this.setTimer(RegularTimerSeconds.WORK_TIME);
            this.setState(RegularTimerStateEnum.WAITING_TO_START);
          }
        }
      }),
      takeWhile(() =>
        RegularTimerState.isCounting(this.currentState) ||
        RegularTimerState.isCountingBreakTime(this.currentState)
      )
    );

  doCount$ = this.startCounter$.pipe(
    tap(() => console.log('startCounter$')),
    mapTo(true)
  );

  dontCount$ = this.stopCounter$.pipe(
    tap(() => console.log('stopCounter$')),
    mapTo(false)
  );

  shouldCount$ = merge(this.doCount$, this.dontCount$).pipe(
    startWith(false)
  );

  myCountdown$ = this.shouldCount$.pipe(
    switchMap(shouldCount => shouldCount ? this.secondsCountdown$ : EMPTY)
  );

  constructor() {}

  ngOnInit() {
    this.countdownSubscription = this.myCountdown$.subscribe();
  }

  handleStartClock() {
    this.informationText = null;
    this.setState(RegularTimerStateEnum.COUNTING);
    this.startCounter$.next();
  }

  handleStopClock() {
    this.informationText = 'Stopped. Continue?';
    this.setState(RegularTimerStateEnum.WAITING_TO_START);
    this.setTimer(RegularTimerSeconds.WORK_TIME);
    this.stopCounter$.next();
  }

  handlePauseClock() {
    this.informationText = 'Paused';
    this.setState(RegularTimerStateEnum.PAUSED);
    this.stopCounter$.next();
  }

  handleResumeClock() {
    this.informationText = 'Resuming';
    this.setState(RegularTimerStateEnum.COUNTING);
    this.startCounter$.next();
  }

  handleSkipRest() {
    this.setTimer(RegularTimerSeconds.WORK_TIME);

    this.setState(RegularTimerStateEnum.WAITING_TO_START);
  }

  handleDoneClicked() {
    this.handleWorkDone();
    this.informationText = 'Done';

    this.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);

    this.startCounter$.next();
  }

  setTimer(value: number) {
    this.remainingSeconds = value;
  }

  setState(state: number) {
    this.currentState = state;
  }

  private handleWorkDone() {
    this.doneCounter++;
    this.setTimer(this.getBreakTimer());
  }

  private getBreakTimer(): number {
    const shouldSetLongBreak: boolean = (
      this.doneCounter !== 0 &&
      this.doneCounter % 4 === 0
    );

    return shouldSetLongBreak
      ? RegularTimerSeconds.LONG_BREAK_TIME
      : RegularTimerSeconds.SHORT_BREAK_TIME;
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }
}
