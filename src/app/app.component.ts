import { Component } from '@angular/core';
import { Task } from './task/task';
import { transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Kanban-fire';
  todo: Task[] = [
    {
      title: 'Buy croissant',
      description: 'Go to the store and buy croissant'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase'
    }
  ]
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) { }

  newTask(): void {
    const dialogueRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogueRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }
  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<Task[] | any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }

    //to enable transfer from one table to another 

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
