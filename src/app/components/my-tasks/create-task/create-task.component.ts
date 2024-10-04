import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from 'src/app/Model/tasks';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {


  taskForm! : FormGroup;
 

constructor( private fb: FormBuilder , private taskService:TaskService  ){
  this.taskForm = this.fb.group({
    title : ['', Validators.required],
    discription : ['', Validators.required],
    assTo : ['', Validators.required],
    cDate : ['', Validators.required],
    status : ['', Validators.required],
    priority : ['', Validators.required]
  })
}

ngOnInit(): void {
  this.taskForm;
}



onSubmit(data: Tasks){
  
  this.taskService.createTasks(data).subscribe((resp)=>{
      console.log('this is response', resp)
  });

  console.log(this.taskForm.value);
  
  this.taskForm.reset();
}

}

