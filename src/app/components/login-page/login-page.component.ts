import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/Model/register';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  isLoading: boolean= false;

  constructor(private fb: FormBuilder, private _authService: AuthService, private _toaster: ToastrService, private _router: Router) { 
    this.loginForm = this.fb.group({
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required,  
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
      ),]],
      })
  }
  ngOnInit(): void {
    this. loginForm;
  }
  onSubmit(data: Register){

   const email = data.email;
    const password = data.password;
    

    this.isLoading = true
    this._authService.signIn(email, password).subscribe({
      
      next: (res) => {
        console.log(res)
        this.isLoading = false
        this._router.navigate([''])
      },
      error: (errMsg) => {

        this.isLoading = false
        this._toaster.error(errMsg, "Error!", {
          positionClass: 'toast-bottom-left',
          progressBar: true,
          closeButton: true,
        })
      }
    })
    // this.loginForm.reset();
  }

}
