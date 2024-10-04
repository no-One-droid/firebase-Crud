import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employees } from 'src/app/Model/employee';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  createEmpl! : FormGroup;
  
  Gender: any = [
    { id: 'maleId', value: 'Male', display: 'Male' },
    { id: 'femaleId', value: 'Female', display: 'Female' },
    { id: 'otherId', value: 'other', display: 'other' },
  ];
 

  constructor( private fb: FormBuilder , private _emplService: EmployeService){
    this.createEmpl = this.fb.group({
      firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', ],
        dOb: ['', [Validators.required,]],
        skills: ['',],
        experience: ['',],
        city: ['', Validators.required],
        street: ['', Validators.required],
    })
  }
  
  ngOnInit(): void {
    this.createEmpl;
  }

  get fc(){
    return this.createEmpl.controls
  }

  
  openModal(){
    const empMod =  document.getElementById('myModal');
    if(empMod != null){
      empMod.style.display = 'block'
    }
   
  }
  closeModal(){
    const empMod =  document.getElementById('myModal');
    if(empMod != null){
      empMod.style.display = 'none'
    }
   
  }
  
  onSubmit(data: Employees){
    // this.closeModal();
    // console.log(data);

    this._emplService.addEmploye(data).subscribe((resp)=>{
      console.log("from add employee", resp)
    })
    // this.createEmpl.reset();
  }


}
