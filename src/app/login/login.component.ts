import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  loginUser() {
    this._loginService.userLogin(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('email', res.data.email);
        this.toastService.show('✔ Logged In Successfully', {
          classname: 'bg-success text-light',
          delay: 5000,
        });
        this._router.navigate(['/nav']);
      },
      (err) => {
        this.toastService.show('❌ Please Check Credentials', {
          classname: 'bg-danger text-light',
          delay: 15000,
        });
      }
    );
  }
}
