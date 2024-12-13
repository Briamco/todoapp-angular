import { Component, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, ReactiveFormsModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  title = 'My Day'

  tasks = signal<Task[]>([
    { id: 1, title: 'Task 1', completed: false, editing: false },
    { id: 2, title: 'Task 2', completed: false, editing: false },
  ])

  filter = 'all'

  newTaskCtl = new FormControl('', {
    nonNullable: true,
    validators: [ Validators.required ]
  })

  changeHandler() {
    if (this.newTaskCtl.valid) {
      const newTask = this.newTaskCtl.value
      this.addTask(newTask)
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: this.tasks().length + 1,
      title,
      completed: false,
      editing: false
    }

      this.tasks.update(tasks => [...tasks, newTask])
      this.newTaskCtl.reset()
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id))
  }

  editTask(id: number, event: Event) {
    const newTitle = (event.target as HTMLInputElement).value

    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, editing: false ,title: newTitle } : task))
  }

  pendingTasks() {
    return this.tasks().filter(task => !task.completed).length
  }

  clearCompleted() {
    this.tasks().filter(task => task.completed).forEach(task => this.deleteTask(task.id))
  }
}