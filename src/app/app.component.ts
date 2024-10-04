import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'firstHttP-app';

  constructor(private _authService: AuthService){}

  ngOnInit(): void {
    this._authService.autoLogin();
  }
}
