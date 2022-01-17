import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  title = 'Kanban-fire';
  todo: Task[] = [

    { 
      title: 'buy milk',
      description: 'Using Fire base and Angular create a kanban app!'
    }
  ]
}
