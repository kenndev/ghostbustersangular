import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  imageSrc = 'assets/cover.jpg';
  imageAlt = 'coverImage';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
