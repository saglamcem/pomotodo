import { Injectable } from '@angular/core';
import {
  RegularTimerSeconds,
  RegularTimerState,
  RegularTimerStateEnum
} from '../../shared/util/regular/regular-timer-state';
import { BehaviorSubject, EMPTY, merge, Observable, of, Subject, timer } from 'rxjs';
import { mapTo, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  informationText: string = null;

  currentState: RegularTimerStateEnum = RegularTimerStateEnum.WAITING_TO_START;
  doneCounter = 0;
  remainingSeconds: number = RegularTimerSeconds.WORK_TIME;

  private _state: Subject<RegularTimerStateEnum> = new BehaviorSubject(RegularTimerStateEnum.WAITING_TO_START);
  private _seconds: Subject<number> = new BehaviorSubject(RegularTimerSeconds.WORK_TIME);
  private _doneCounter: Subject<number> = new BehaviorSubject(0);
  private _informationText: Subject<string> = new BehaviorSubject(null);

  public readonly state$: Observable<RegularTimerStateEnum> = this._state.asObservable();
  public readonly seconds$: Observable<number> = this._seconds.asObservable();
  public readonly doneCounter$: Observable<number> = this._doneCounter.asObservable();
  public readonly informationText$: Observable<string> = this._informationText.asObservable();

  private startCounter$: Subject<any> = new Subject<any>();
  private stopCounter$: Subject<any> = new Subject<any>();

  private secondsCountdown$ = timer(0, 1000)
    .pipe(
      tap(val => {
        if (!RegularTimerState.isWaitingToStart(this.currentState)) {
          this.setTimer(--this.remainingSeconds);
        }

        if (this.remainingSeconds === 0) {
          if (RegularTimerState.isCounting(this.currentState)) {
            // this.doneCounter++;
            this.setDoneCounter(++this.doneCounter);
            this.setInformationText('Take a break, and relax');
            this.setTimer(this.getBreakTimer());
            this.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);
          }
          else if (RegularTimerState.isCountingBreakTime(this.currentState)) {
            this.setInformationText('Back to work!');
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

  private doCount$ = this.startCounter$.pipe(
    tap(() => console.log('startCounter$')),
    mapTo(true)
  );

  private dontCount$ = this.stopCounter$.pipe(
    tap(() => console.log('stopCounter$')),
    mapTo(false)
  );

  private shouldCount$ = merge(this.doCount$, this.dontCount$).pipe(
    startWith(false)
  );

  countdownEvent$ = this.shouldCount$.pipe(
    switchMap(shouldCount => shouldCount ? this.secondsCountdown$ : EMPTY)
  );

  constructor() {}

  setState(state: RegularTimerStateEnum) {
    this.currentState = state;
    this._state.next(this.currentState);
  }

  setTimer(seconds: number) {
    this.remainingSeconds = seconds;
    this._seconds.next(this.remainingSeconds);
  }

  setInformationText(text: string) {
    this.informationText = text;
    this._informationText.next(this.informationText);
  }

  setDoneCounter(counter: number) {
    this.doneCounter = counter;
    this._doneCounter.next(this.doneCounter);
  }

  startClock() {
    this.startCounter$.next();
  }

  stopClock() {
    this.stopCounter$.next();
  }

  handleWorkDone() {
    this.setDoneCounter(++this.doneCounter);
    this.setTimer(this.getBreakTimer());
    this.setState(RegularTimerStateEnum.COUNTING_BREAK_TIME);
  }

  private isTimeForLongBreak(): boolean {
    return (
      this.doneCounter !== 0 &&
      this.doneCounter % 4 === 0
    );
  }

  private getBreakTimer(): number {
    return this.isTimeForLongBreak()
      ? RegularTimerSeconds.LONG_BREAK_TIME
      : RegularTimerSeconds.SHORT_BREAK_TIME;
  }
}
