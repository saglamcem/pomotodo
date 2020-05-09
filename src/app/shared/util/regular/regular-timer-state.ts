export enum RegularTimerStateEnum {
  WAITING_TO_START,
  COUNTING,
  COUNTING_BREAK_TIME,
  PAUSED,
  STOPPED,
}

// TODO: UNCOMMENT WHEN RELEASING
// export const RegularTimerSeconds = {
//   WORK_TIME: 25 * 60,
//   SHORT_BREAK_TIME: 5 * 60,
//   LONG_BREAK_TIME: 15 * 60
// }

export const RegularTimerSeconds = {
  WORK_TIME: 8,
  SHORT_BREAK_TIME: 4,
  LONG_BREAK_TIME: 6
}

export class RegularTimerState {
  private state: RegularTimerStateEnum;
  private remainingSeconds: number;

  static isWaitingToStart(state: number) {
    return state === RegularTimerStateEnum.WAITING_TO_START;
  }

  static isCounting(state: number) {
    return state === RegularTimerStateEnum.COUNTING;
  }

  static isCountingBreakTime(state: number) {
    return state === RegularTimerStateEnum.COUNTING_BREAK_TIME;
  }

  static isPaused(state: number) {
    return state === RegularTimerStateEnum.PAUSED;
  }

  static isStopped(state: number) {
    return state === RegularTimerStateEnum.STOPPED;
  }

  static getStateLabel(state: number) {
    return RegularTimerStateEnum[state];
  }

  getState() {
    return this.state;
  }

  setState(state: RegularTimerStateEnum) {
    this.state = state;
  }

  getRemainingSeconds() {
    return this.remainingSeconds;
  }

  setTimer(value: number) {
    this.remainingSeconds = value;
  }
}
