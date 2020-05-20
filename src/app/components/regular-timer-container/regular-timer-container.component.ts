import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  RegularTimerSeconds,
  RegularTimerState,
  RegularTimerStateEnum
} from '../../shared/util/regular/regular-timer-state';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'pomo-regular-timer-container',
  templateUrl: './regular-timer-container.component.html',
  styleUrls: ['./regular-timer-container.component.scss']
})
export class RegularTimerContainerComponent implements OnInit, OnDestroy {
  TimerState = RegularTimerState;

  countdownSubscription: Subscription;

  constructor(public timer: TimerService) {}

  currentState$ = this.timer.state$.pipe(tap(state => console.log(`currentState$: ${state}`)));
  remainingSeconds$ = this.timer.seconds$.pipe(tap(seconds => console.log(`remainingSeconds$: ${seconds}`)));
  doneCounter$ = this.timer.doneCounter$.pipe(tap(counter => console.log(`doneCounter$: ${counter}`)));
  informationText$ = this.timer.informationText$.pipe(tap(informationText => console.log(`informationText$: ${informationText}`)));

  ngOnInit() {
    this.countdownSubscription = this.timer.countdownEvent$.subscribe(val => console.log(val));
  }

  handleStartClock() {
    this.timer.setInformationText(null);
    this.timer.setState(RegularTimerStateEnum.COUNTING);
    this.timer.startClock();
  }

  handleStopClock() {
    this.timer.setInformationText('Stopped. Continue?');
    this.timer.setState(RegularTimerStateEnum.WAITING_TO_START);
    this.timer.setTimer(RegularTimerSeconds.WORK_TIME);
    this.timer.stopClock();
  }

  handlePauseClock() {
    this.timer.setInformationText('Paused');
    this.timer.setState(RegularTimerStateEnum.PAUSED);
    this.timer.stopClock();
  }

  handleResumeClock() {
    this.timer.setInformationText('Resuming');
    this.timer.setState(RegularTimerStateEnum.COUNTING);
    this.timer.startClock();
  }

  handleSkipRest() {
    this.timer.setTimer(RegularTimerSeconds.WORK_TIME);
    this.timer.setState(RegularTimerStateEnum.WAITING_TO_START);
  }

  handleDoneClicked() {
    this.timer.handleWorkDone();
    this.timer.setInformationText('Done');
    this.timer.startClock();
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }
}
