import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.css'],
})
export class MoviedetailComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private http: HttpClient
  ) {}

  sub: any;
  movie: any;
  id: any;
  imageSrc = '';
  imageAlt = 'coverImage';

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.http
      .get(
        'https://api.themoviedb.org/3/movie/'+this.id+'?api_key=79d2c03fb51306a9c74c0f7ab44337bd&language=en-US'
      )
      .subscribe((Response) => {
        this.movie = Response;
        this.imageSrc = 'https://image.tmdb.org/t/p/w500/'+this.movie['poster_path'];
        console.log(this.movie);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
