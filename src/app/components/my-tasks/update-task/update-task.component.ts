import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from 'src/app/Model/tasks';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit, OnChanges {

  @Input() setTask!: string;


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

ngOnChanges(changes: SimpleChanges): void {
  this.taskService.getTaskById(this.setTask).subscribe((resp)=>{
    // console.log(resp);
    this.taskForm.patchValue(resp)
  })
  
}
ngOnInit(): void {
  this.taskForm;
}


onUpdate(data: Tasks){
this.taskForm.patchValue(data);
// console.log(this.taskForm.value) 
this.taskService.updateTask( this.setTask, this.taskForm.value).subscribe((resp)=>{
  console.log('task updated succesfuly',resp);
})
}






// onUpdateID(){
//   this.taskService.getTaskById(this.setTask).subscribe((resp)=>{
//     console.log('this is response', resp)
//     this.taskForm.patchValue({ resp})
//     console.log(resp)
// })
// }

}
