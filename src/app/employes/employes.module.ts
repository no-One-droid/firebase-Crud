import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployesRoutingModule } from './employes-routing.module';
import { EmployesComponent } from './employes.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { EditEmployeComponent } from './edit-employe/edit-employe.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployesComponent,
    AddEmployeComponent,
    EditEmployeComponent
  ],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployesModule { }
