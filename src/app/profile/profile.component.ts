import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any[] = [];
  form: FormGroup;
  error: boolean = false;
  success: boolean = false;
  messages: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get phonenumber() {
    return this.form.get('phonenumber');
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.form = this.fb.group({
      first_name: this.profile['first_name'],
      last_name: this.profile['last_name'],
      phonenumber: this.profile['phonenumber'],
    });
  }

  fetchUsers() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .get('https://ghostbustermovies.herokuapp.com/api/user', { headers: reqHeader })
      .subscribe(
        (result: any) => {
          this.profile = result;
          // console.log(this.profile['first_name']);
        },
        (error) => {
          console.log('error');
          console.log(error);
        }
      );
  }

  onSubmit() {
    // console.log(this.form.getRawValue());
    const formdata = this.form.getRawValue();
    const data = {
      first_name: formdata.first_name,
      last_name: formdata.last_name,
      phonenumber: formdata.phonenumber,
      user_id: this.profile['id'],
    };

    let reqHeader = new HttpHeaders({
      Accept: 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http.post('https://ghostbustermovies.herokuapp.com/api/update-profile', data, { headers: reqHeader }).subscribe(
      (result: any) => {
        // console.log('success');
        // console.log(result.message);
        this.error = false;
        this.success = result.message;
      },
      (errors) => {
        this.error = true;
        this.success = false;
        this.messages = [];
        for (let [key, value] of Object.entries(errors.error.errors)) {
          console.log(value[0]);
          this.messages.push(value[0]);
        }
        //console.log(this.messages);
      }
    );
  }
}
