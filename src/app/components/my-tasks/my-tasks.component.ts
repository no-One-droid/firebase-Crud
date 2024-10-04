import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/Model/tasks';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

allTasks: Tasks[] = [];

taskId!: string;


constructor(private taskService : TaskService, private _router: Router){
  
}

  ngOnInit(): void {
    this.fetchData();
    this.allTasks;
  }

  private fetchData(){
    this.taskService.fetchTasks().subscribe((task)=>{
      this.allTasks = task;
      // console.log('from task', task)
    })
  }

  fetchTasks(){
    this.fetchData()
  }


  onDelete(id: string){
    this.taskService.deleteTasks(id).subscribe((resp) =>{
      console.log('this is response when delete it', resp)
    })
  }

  onUpdate(id: string){
    this.taskId = id;
    // console.log(this.taskId)
  }
  
}

