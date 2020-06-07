import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../../services/todo/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pomo-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoContainerComponent implements OnInit, OnDestroy {
  subSink: Subscription = new Subscription();

  todoItems: TodoItem[] = [];
  currentFocusItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    const todoSubscription = this.todoService.getAllItems()
      .subscribe(([todoItems, currentFocusItems, doneItems]) => {
        console.log(todoItems)
        console.log(currentFocusItems)
        console.log(doneItems)
        this.todoItems = todoItems;
        this.currentFocusItems = currentFocusItems;
        this.doneItems = doneItems;
      });

    this.subSink.add(todoSubscription);

    setTimeout(() => {
      this.todoService.addTodoItem({
        finished: false,
        atIteration: 1,
        label: 'Auto generated todo item 1',
        description: 'Description: Auto generated todo item 1'
      });
    }, 3000);
  }

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

  handleDropForDoneItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.doneItems, event.previousIndex, event.currentIndex);
  }

  // TODO: Implement modal
  // TODO: Write test for modal
  openNewTodoModal() {
    console.log('openNewTodoModal()');
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
