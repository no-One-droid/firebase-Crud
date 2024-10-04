import { User } from './../../Model/User';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isloggedIn: boolean = false;
  private useSub!: Subscription;

  constructor(private _authService : AuthService){}

  ngOnInit(): void {
     this.useSub = this._authService.user.subscribe((User: User | null)=>{
      this.isloggedIn = User ? true : false
    })
  }

  logOut(){
    this._authService.logOut();
  }

  ngOnDestroy(): void {
    this.useSub.unsubscribe();
    
  }
}
