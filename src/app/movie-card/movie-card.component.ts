import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchApi: GetMoviesService) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void{
    this.fetchApi.getMovies().subscribe((resp: any) => {
      this.movies = resp.data
      return this.movies
    })
  }

}
