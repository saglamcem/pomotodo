import { RegularTimerState, RegularTimerStateEnum } from './regular-timer-state';

describe('RegularTimerState', () => {
  it('should track states properly', () => {
    const countingState = RegularTimerStateEnum.COUNTING;
    expect(RegularTimerState.isCounting(countingState)).toBeTruthy();

    const waitingToStartState = RegularTimerStateEnum.WAITING_TO_START;
    expect(RegularTimerState.isWaitingToStart(waitingToStartState)).toBeTruthy();

    const pausedState = RegularTimerStateEnum.PAUSED;
    expect(RegularTimerState.isPaused(pausedState)).toBeTruthy();
  })
})
