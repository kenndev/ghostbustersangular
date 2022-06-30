import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  form: FormGroup;
  processing: boolean = false;
  error: boolean = false;
  success: boolean = false;
  messages: any[] = [];

  get email() {
    return this.form.get('email');
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
    });
  }

  onSubmit() {
    this.processing = true;
    const formdata = this.form.getRawValue();
    const data = {
      email: formdata.email,
    };

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http.post('https://ghostbustermovies.herokuapp.com/api/subscribe', data, { headers: reqHeader }).subscribe(
      (result: any) => {
        this.error = false;
        this.success = result.message;
        this.messages = [];
        this.messages.push(result.message)
        this.processing = false;
      },
      (errors) => {
        this.error = true;
        this.success = false;
        this.processing = false;
        this.messages = [];
        for (let [key, value] of Object.entries(errors.error.errors)) {
          console.log(value[0]);
          this.messages.push(value[0]);
        }
      }
    );
  }
}
