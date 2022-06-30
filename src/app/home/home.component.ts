import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  li: any;
  movies: any[] = [];
  page = 1;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    
    this.fetchMovies();
  }

  formatOverview(desc: any) {
    return desc.split(' ').splice(0, 20).join(' ') + '...';
  }

  fetchMovies() {
    this.http
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=79d2c03fb51306a9c74c0f7ab44337bd&language=en-US&page=' +
          this.page
      )
      .subscribe((Response) => {
        this.li = Response;
        this.movies.push(...this.li.results);
        this.page = this.page + 1;
      });
  }

}
