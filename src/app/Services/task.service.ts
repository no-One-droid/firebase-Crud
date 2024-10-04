import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, of, take } from 'rxjs';
import { Tasks } from '../Model/tasks';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor( private http : HttpClient, private _authService: AuthService) { }


  //create tasks
  
 createTasks(data: Tasks){
  return this._authService.user.pipe( take(1), exhaustMap(user=>{

    //check if users value is null if not then it will return the observbale

    if (!user || !user.token) {
      return of([]); 
    }
  // const headers = new HttpHeaders({'my-header' : 'hello world'})
    return this.http.post<{name: string}>('https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/tasks.json', data,
      {params: new HttpParams().set('auth', user.token)}
    )
  }))
 }


 // fetch tasks 

 fetchTasks(){
  return this._authService.user.pipe( take(1), exhaustMap(user=>{

    if (!user || !user.token) {
      return of([]); 
    }
      return this.http.get<{[Key : string] : Tasks}>('https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/tasks.json',
        {params: new HttpParams().set('auth', user.token)}
      )
    .pipe(map((resp)=>{
      let task = [];
      for (const key in resp){
        if(resp.hasOwnProperty(key)){
          task.push({...resp[key], id: key});
        } 
      }
      return task;
    }))
    })

  )  
 }


 // delete tasks by id
 deleteTasks(id : string){
  return this._authService.user.pipe( take(1), exhaustMap(user=>{

    if (!user || !user.token) {
      return of([]); 
    }
  return this.http.delete('https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/tasks/' +id+ '.json',
    {params: new HttpParams().set('auth', user.token)}
    )  
  }))

 }


 // get tasks by id
 getTaskById(id: string) {
  return this._authService.user.pipe( take(1), exhaustMap(user=>{

    if (!user || !user.token) {
      return of([]); 
    }
  return this.http
    .get<Tasks>(`https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/tasks/${id}.json`,
      {params: new HttpParams().set('auth', user.token)}
    )
    .pipe(
      map((resp) => {
        return { ...resp, id: id };
      })
    );
    }))
}


//updated task by id
updateTask(id: string, updatedTask: Partial<Tasks>) {
  return this._authService.user.pipe( take(1), exhaustMap(user=>{

    if (!user || !user.token) {
      return of([]); 
    }
  return this.http
    .put(`https://angularhttpclient-ca3f1-default-rtdb.firebaseio.com/tasks/${id}.json`, updatedTask,
      {params: new HttpParams().set('auth', user.token)}
    );
    }))
}
}
