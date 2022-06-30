import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  get email() {
    return this.form.get('email');
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get password() {
    return this.form.get('password');
  }
  get password_confirmation() {
    return this.form.get('password_confirmation');
  }

  error: boolean = false;
  processing: boolean = false;
  messages: any = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
      last_name: '',
      first_name: '',
      password_confirmation: '',
    });
  }

  onSubmit() {
    this.processing = true;
    console.log(this.form.getRawValue());
    const formdata = this.form.getRawValue();
    const data = {
      email: formdata.email,
      password: formdata.password,
      password_confirmation: formdata.password_confirmation,
      last_name: formdata.last_name,
      first_name: formdata.first_name,
    };

    let reqHeader = new HttpHeaders({
      Accept: 'application/json',
    });

    this.http.post('https://ghostbustermovies.herokuapp.com/api/register', data).subscribe(
      (result: any) => {
        console.log('success');
        console.log(result);
        localStorage.setItem('token', result.access_token);
        this.processing = false;
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.error = true;
        this.messages = [];
        for (let [key, value] of Object.entries(error.error.errors)) {
          console.log(value[0]);
          this.processing = false;
          this.messages.push(value[0]);
        }
      }
    );
  }
}
