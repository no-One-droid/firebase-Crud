import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authresponse } from '../Model/Authresponse';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User| null>(null);
  private expireTimer: any;

  constructor( private http: HttpClient, private _router: Router) { }

  //signup for a new user

  signUp(email: string, password: string){
    const data = {email: email, password: password, returnSecureToken: true}
    return this.http.post<Authresponse>
    (
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANmqS6AbY1Hs7GDJPXtnMgKICzIRubHgU', data
    )
    
    .pipe(catchError(this.handelError), tap((resp)=>{
      
      this.handleUser(resp)
    })
)
  }

  // user signIn 

  signIn(email: string, password: string){
    const data = {email: email, password: password, returnSecureToken: true}
    return this.http.post<Authresponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANmqS6AbY1Hs7GDJPXtnMgKICzIRubHgU', data)
    
    .pipe(catchError(this.handelError), tap((resp)=>{
      
      this.handleUser(resp)
    })
    )
  
  }

  //signout
  logOut(){
    this.user.next(null);
    this._router.navigate([''])
    localStorage.removeItem('user')
    if (this.expireTimer) {
      clearTimeout(this.expireTimer)
    }
    this.expireTimer = null
  }

  autoLogin(){
    const user = localStorage.getItem('user')

    if (!user) {
      return
    }
    const nUser = JSON.parse(user)
    const loggedIn = new User(nUser.email, nUser.id, nUser._token, nUser._expiresIn)
    if (loggedIn.token) {
      this.user.next(loggedIn)

      const timerValue = this.expireTimer.getTime() - new Date().getTime();
      this.autoLogout(timerValue)
    }

  }

  autoLogout(timeExpire: number){
    this.expireTimer = setTimeout(() => {
      this.logOut()
    }, timeExpire);
  }

  //handle error messages while creating new user and sign in 
   
  private handelError(err: { error: { error: { message: any; }; }; }){
    let errMsg = 'An unknwon error has occured!'
    console.log(err)
      if(!err.error || !err.error.error){
        return throwError(()=> errMsg
        )
      }

      switch( err.error.error.message){
        
        case 'EMAIL_EXISTS':
          errMsg = 'Email already exists'
          break;
        case 'OPERATION_NOT_ALLOWED':
          errMsg = 'Operation not allowed'
          break;case 'INVALID_LOGIN_CREDENTIALS':
          errMsg = 'Your Email or Password is not correct!'
          break;
      }

      return throwError(()=> errMsg);
      
  }

  //handle new created user for signup and login

  private handleUser(resp: { expiresIn: string | number; email: string; localId: string; idToken: string; }){
    const expiresTime = new Date().getTime() + +resp.expiresIn * 1000;
    const expiresIn = new Date(expiresTime)
    const newUser = new User(resp.email, resp.localId, resp.idToken, expiresIn)
    this.user.next(newUser)
    this.autoLogout(Number(resp.expiresIn) * 1000)

    localStorage.setItem('user', JSON.stringify(newUser))

  }
}
