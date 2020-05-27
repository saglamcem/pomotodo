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
    {label: 'Get to work', finished: false},
    {label: 'Pick up groceries', finished: false},
    {label: 'Go home', finished: false}
  ];

  currentFocus: TodoItem[] = [
    {label: 'Fall asleep', finished: false}
  ];

  done: TodoItem[] = [
    {label: 'Get up', finished: true},
    {label: 'Brush teeth', finished: true},
    {label: 'Take a shower', finished: true},
    {label: 'Check e-mail', finished: true},
    {label: 'Walk dog', finished: true}
  ];

  drop(event: CdkDragDrop<TodoItem[]>) {
    console.log(event.item);

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
