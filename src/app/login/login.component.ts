import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  error: boolean = false;
  messages: any = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    const formdata = this.form.getRawValue();
    const data = {
      email: formdata.email,
      password: formdata.password,
    };

    let reqHeader = new HttpHeaders({
      Accept: 'application/json',
    });

    this.http.post('https://ghostbustermovies.herokuapp.com/api/login', data).subscribe(
      (result: any) => {
        console.log('success');
        console.log(result);
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['/']);
      },
      (errors) => {
        this.error = true;
        this.messages = [];
        if (errors.error.error) {
          console.log(errors.error.error);
          this.messages.push(errors.error.error);
        } else {
          console.log(errors.error.errors);
          for (let [key, value] of Object.entries(errors.error.errors)) {
            console.log(value[0]);

            this.messages.push(value[0]);
          }
        }
      }
    );
  }
}
