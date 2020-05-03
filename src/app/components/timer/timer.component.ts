import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pomo-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() seconds!: number;
  @Output() startClock!: EventEmitter<any>;
  @Output() stopClock!: EventEmitter<any>;
  @Output() resetClock!: EventEmitter<any>;

  constructor() {
  }

  ngOnInit() {
    console.log(this.seconds);
  }

  onStartClicked() {
    this.startClock.emit();
  }

  onStopClicked() {
    this.stopClock.emit();
  }

  onResetClicked() {
    this.resetClock.emit();
  }
}
