import { EventEmitter } from '@angular/core';

// export enum TimerState<string> {
//   WAITING_TO_START: "0",
//   COUNTING = "1",
//   PAUSED = "2",
//   STOPPED = "3"
// }

export type TimerState = {
  key: string;
  label: string;
  options: ButtonSettings[];
  running?: boolean;
}

export type ButtonSettings = {
  label: string;
  onClick: () => EventEmitter<any>;
  disabled: boolean;
}
