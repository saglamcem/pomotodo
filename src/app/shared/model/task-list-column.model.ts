import { TaskItem } from './task-item.model';

export class TaskListColumn {
  id: string;
  columnTitle: string;
  taskList: TaskItem[];
  cdkConnectedTo: string[];
}
