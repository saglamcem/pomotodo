import { TimerState } from './timer-state';

export const States: TimerState[] = [
  {
    key: 'WAITING_TO_START',
    label: 'Waiting to start',
    options: [
      {
        label: 'Start',
        disabled: false,
        // TODO: figure out how to use onclick like this
        // possibly we don't need to have an object like this
        // also possibly we can have this, and override the onClick value
        // in the components
        onClick: null
      },
      {
        label: 'Stop',
        disabled: true,
        onClick: null
      }
    ]
  }
];
