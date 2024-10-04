import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { EmployeService } from '../Services/employe.service';
import { Employees } from '../Model/employee';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  allEmployees: Employees[] = [];
 
  constructor(private _empService: EmployeService){}

  @ViewChild(AddEmployeComponent) addEmp! : AddEmployeComponent

  ngOnInit(): void {
  this.fetchEmp();
  this.allEmployees;

  }

  fetchEmp(){
    this._empService.fetchEmploye().subscribe((emp)=>{
      this.allEmployees = emp
    })
  }

  opModal(){
    this.addEmp.openModal();
  }


}
