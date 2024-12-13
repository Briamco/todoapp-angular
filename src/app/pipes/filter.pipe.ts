import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../pages/models/task.model';

@Pipe({
  name: 'filterTasks'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], filter: string): Task[] {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed)
      case 'completed':
        return tasks.filter(task => task.completed)
      default:
        return tasks
    }
  }

}
