import { Injectable } from '@angular/core';
import { TaskItem } from '../../shared/model/task-item.model';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  todoItems: TaskItem[] = [];
  currentFocusItems: TaskItem[] = [];
  doneItems: TaskItem[] = [];

  private _todoItems: Subject<TaskItem[]> = new BehaviorSubject(this.todoItems);
  private _currentFocusItems: Subject<TaskItem[]> = new BehaviorSubject(this.currentFocusItems);
  private _doneItems: Subject<TaskItem[]> = new BehaviorSubject(this.doneItems);

  public readonly todoItems$: Observable<TaskItem[]> = this._todoItems.asObservable();
  public readonly currentFocusItems$: Observable<TaskItem[]> = this._currentFocusItems.asObservable();
  public readonly doneItems$: Observable<TaskItem[]> = this._doneItems.asObservable();

  constructor() {
    const allItems = localStorage.getItem('allItems');

    const allItemsJson: { todo: TaskItem[], focus: TaskItem[], done: TaskItem[] } = allItems
      ? JSON.parse(allItems)
      : { todo: [], focus: [], done: [] };

    const { todo, focus, done } = allItemsJson;

    this.setTodoItems(todo);
    this.setCurrentFocusItems(focus);
    this.setDoneItems(done);
  }

  getAllItems(): Observable<any> {
    return combineLatest([
      this.todoItems$,
      this.currentFocusItems$,
      this.doneItems$
    ]);
  }

  addTodoItem(newTodoItem: TaskItem) {
    this.setTodoItems([...this.todoItems, newTodoItem]);

    const allItemsStringifiedJson = JSON.stringify({
      todo: this.todoItems,
      focus: this.currentFocusItems,
      done: this.doneItems
    });

    localStorage.setItem('allItems', allItemsStringifiedJson);
  }

  setTodoItems(todoItems: TaskItem[] = []) {
    this.todoItems = todoItems;
    this._todoItems.next(this.todoItems);
  }

  setCurrentFocusItems(currentFocusItems: TaskItem[] = []) {
    this.currentFocusItems = currentFocusItems;
    this._currentFocusItems.next(this.currentFocusItems);
  }

  setDoneItems(doneItems: TaskItem[] = []) {
    this.doneItems = doneItems;
    this._doneItems.next(this.doneItems);
  }
}
