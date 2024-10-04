import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../Model/employee';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private Http: HttpClient) {  }

  addEmploye(empl : Employees){
     return this.Http.post<{name: string}>('https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/Employe.json',empl)
  }

  fetchEmploye(){
    return this.Http.get<{[Key: string]: Employees}>('https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/Employe.json')
    .pipe(map((resp)=>{
      let employ = [];
      for( const Key in resp){
        if(resp.hasOwnProperty(Key)){
          employ.push({...resp[Key], id: Key})
        }
      }
      return employ
    }))
    
  }
}
