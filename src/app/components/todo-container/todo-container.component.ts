import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoItem } from '../../shared/model/todo-item.model';
import { TaskListColumn } from '../../shared/model/task-list-column.model';
import Constants from '../../shared/constants';

@Component({
  selector: 'pomo-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  taskColumns: TaskListColumn[];

  Constants = Constants;

  constructor() {}

  ngOnInit(): void {
    this.taskColumns = [
      {
        cdkConnectedTo: [
          Constants.CURRENT_FOCUS.id,
          Constants.DONE.id
        ],
        columnTitle: Constants.TODO.columnTitle,
        id: Constants.TODO.id,
        taskList: this.todo
      },
      {
        cdkConnectedTo: [
          Constants.TODO.id,
          Constants.DONE.id
        ],
        columnTitle: Constants.CURRENT_FOCUS.columnTitle,
        id: Constants.CURRENT_FOCUS.id,
        taskList: this.currentFocus
      },
      {
        cdkConnectedTo: [
          Constants.TODO.id,
          Constants.CURRENT_FOCUS.id
        ],
        columnTitle: Constants.DONE.columnTitle,
        id: Constants.DONE.id,
        taskList: this.done
      }
    ];
  }

  todo: TodoItem[] = [
    {label: 'Get to work',  atIteration: 1, finished: false},
    {label: 'Pick up groceries',  atIteration: 1, finished: false},
    {label: 'Go home', atIteration: 1, finished: false}
  ];

  currentFocus: TodoItem[] = [
    {label: 'Fall asleep', atIteration: 1, finished: false}
  ];

  done: TodoItem[] = [
    {label: 'Get up', atIteration: 1, finished: true},
    {label: 'Brush teeth', atIteration: 1, finished: true},
    {label: 'Take a shower', atIteration: 1, finished: true},
    {label: 'Check e-mail', atIteration: 1, finished: true},
    {label: 'Walk dog', atIteration: 1, finished: true}
  ];

  drop(event: CdkDragDrop<TodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
