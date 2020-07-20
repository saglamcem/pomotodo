import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskItem } from '../../shared/model/task-item.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/todo/task.service';
import { ModalService } from '../../services/modal/modal.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TaskListType } from '../../shared/model/task-list-type.enum';

@Component({
  selector: 'pomo-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskContainerComponent implements OnInit, OnDestroy {
  subSink: Subscription = new Subscription();

  todoItems: TaskItem[] = [];
  currentFocusItems: TaskItem[] = [];
  doneItems: TaskItem[] = [];

  TaskListType = TaskListType;

  constructor(
    private readonly taskService: TaskService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    const taskSubscription = this.taskService.getAllItems()
      .subscribe(([todoItems, currentFocusItems, doneItems]) => {
        console.log(todoItems)
        console.log(currentFocusItems)
        console.log(doneItems)
        this.todoItems = todoItems;
        this.currentFocusItems = currentFocusItems;
        this.doneItems = doneItems;
      });

    this.subSink.add(taskSubscription);

    // setTimeout(() => {
    //   this.taskService.addTodoItem({
    //     finished: false,
    //     numberOfCycles: 1,
    //     atIteration: 1,
    //     label: 'Auto generated todo item 1',
    //     description: 'Description: Auto generated todo item 1'
    //   });
    // }, 3000);
  }

  drop(event: CdkDragDrop<TaskItem[]>) {
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

  setFinishedForTaskItem(sourceTaskType: TaskListType, taskId: string) {
    const todoItems: TaskItem[] = [...this.todoItems];
    const currentFocusItems: TaskItem[] = [...this.currentFocusItems];
    const doneItems: TaskItem[] = [...this.doneItems];

    let indexToRemove = null;

    if (sourceTaskType === TaskListType.TODO) {
      indexToRemove = todoItems.findIndex(task => task?.id === taskId);
    }
    else if (sourceTaskType === TaskListType.FOCUS) {
      indexToRemove = currentFocusItems.findIndex(task => task?.id === taskId);
    }
    else if (sourceTaskType === TaskListType.DONE) {
      indexToRemove = doneItems.findIndex(task => task?.id === taskId);
    }

    if (indexToRemove === -1) return;

    let itemToMove: TaskItem = null;

    if (sourceTaskType === TaskListType.TODO) {
      itemToMove = todoItems[indexToRemove];
      todoItems.splice(indexToRemove, 1);

      itemToMove.finished = !itemToMove.finished;
      doneItems.push(itemToMove);

      this.taskService.setTodoItems(todoItems);
      this.taskService.setDoneItems(doneItems);
    }
    else if (sourceTaskType === TaskListType.FOCUS) {
      itemToMove = currentFocusItems[indexToRemove];
      currentFocusItems.splice(indexToRemove, 1);

      itemToMove.finished = !itemToMove.finished;
      doneItems.push(itemToMove);

      this.taskService.setCurrentFocusItems(currentFocusItems);
      this.taskService.setDoneItems(doneItems);
    }
    else if (sourceTaskType === TaskListType.DONE) {
      itemToMove = doneItems[indexToRemove];
      doneItems.splice(indexToRemove, 1);

      itemToMove.finished = !itemToMove.finished;
      todoItems.push(itemToMove);

      this.taskService.setTodoItems(todoItems);
      this.taskService.setDoneItems(doneItems);
    }
  }

  handleDropForDoneItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.doneItems, event.previousIndex, event.currentIndex);
  }

  // TODO: Implement modal
  // TODO: Write test for modal
  openNewTodoModal() {
    console.log('openNewTodoModal()');
    this.modalService.openTaskInputModal()
      .afterClosed()
      .subscribe(newTask => {
        console.log('after closed: ', newTask);
        if (newTask) {
          const newTaskWithId: TaskItem = {
            ...newTask,
            id: uuidv4()
          }
          this.taskService.addTodoItem(newTaskWithId);
        }
      });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
