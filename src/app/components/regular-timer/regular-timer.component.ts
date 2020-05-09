import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegularTimerState } from '../../shared/util/regular/regular-timer-state';
import { toMinutesAndSecondsFormat } from '../../shared/util/string-utils';

@Component({
  selector: 'pomo-regular-timer',
  templateUrl: './regular-timer.component.html',
  styleUrls: ['./regular-timer.component.scss']
})
export class RegularTimerComponent implements OnInit {
  @Input() seconds!: number;
  @Input() informationText?: string;
  @Input() state: number;
  @Output() startClock: EventEmitter<any> = new EventEmitter<any>();
  @Output() stopClock: EventEmitter<any> = new EventEmitter<any>();
  @Output() pauseClock: EventEmitter<any> = new EventEmitter<any>();
  @Output() resumeClock: EventEmitter<any> = new EventEmitter<any>();
  @Output() skipClock: EventEmitter<any> = new EventEmitter<any>();
  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  TimerState = RegularTimerState;

  constructor() {}

  ngOnInit() {}

  onStartClicked() {
    this.startClock.emit();
  }

  onStopClicked() {
    this.stopClock.emit();
  }

  onPauseClicked() {
    console.log('onPauseClicked');
    this.pauseClock.emit();
  }

  onResumeClicked() {
    console.log('onResumeClicked');
    this.resumeClock.emit();
  }

  onDoneClicked() {
    console.log('onDoneClicked');
    this.done.emit();
  }

  onSkipClicked() {
    console.log('onSkipClicked');
    this.skipClock.emit();
  }

  get countdownText(): string {
    return toMinutesAndSecondsFormat(this.seconds);
  }
}
