export class TaskItem {
  id: string;
  label: string;
  description?: string;
  numberOfCycles: number;
  atIteration: number;
  finished: boolean;
}
