import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/Model/register';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  signupForm!: FormGroup;
  isLoading: boolean= false

  constructor( private fb: FormBuilder, private _authService: AuthService, private _toaster: ToastrService, private _router: Router) {
    this.signupForm = this.fb.group(
      {
        // name:  [ '', [Validators.required]],
        email:  ['', [Validators.required, Validators.email]],
        password:  ['', [Validators.required,  
          Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
        ),]],
      //   cPassword:  [ '', [Validators.required,]],
      // },
      // { validators: this.passMatchValidation}
      }
    );
  }


  ngOnInit(): void {
    this.signupForm
  }


//password Validations 
  passMatchValidation(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const cPass = control.get('cPassword')?.value;
    if (pass !== cPass) {
       control.get('cPassword')?.setErrors({ pasMismatch: true });
    }

    return null;
  }

  get f(){
    return this.signupForm.controls;
  }

  submitForm(data: Register) {
    const email = data.email;
    const password = data.password;
    
    console.log(data)
    this.isLoading = true
    this._authService.signUp(email, password).subscribe({
      
      next: (res) => {
        this.isLoading = false
        this._router.navigate([''])
        this._toaster.success('User has been created succefully!', "Success!", {
          positionClass: 'toast-bottom-left',
          progressBar: true,
          closeButton: true,
        
        })
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

  }
}
