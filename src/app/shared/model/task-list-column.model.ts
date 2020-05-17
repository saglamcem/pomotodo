import { TodoItem } from './todo-item.model';

export class TaskListColumn {
  id: string;
  columnTitle: string;
  taskList: TodoItem[];
  cdkConnectedTo: string[];
}
