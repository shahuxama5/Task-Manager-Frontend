import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any = [];
  tasks: any = [];
  selectedListId!: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        if (param['listId']) {
          this.selectedListId = param['listId'];
          this.taskService.getTasks(param['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  onTaskClick (task: any) {
    this.taskService.complete(task).subscribe((res: any) => {
      task.completed = !task.completed;
    });
  }

}
