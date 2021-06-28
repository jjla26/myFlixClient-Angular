import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * Movie card component to show the movie cards
 */
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies()
  }

  /**
   * Function to get all the movies and render them
   */
  getMovies(): void{
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      const name = localStorage.getItem('user')
      this.fetchApiData.getUser(name ? name : '').subscribe(result => {
        this.user = result.data
      })
      this.movies = resp.data
      return this.movies
    })
  }
  /**
   * Function to delete a movie from favorites
   * @param id movie id
   */
  deleteFromFavorites(id: string): void{
    this.fetchApiData.deleteFavorite({ user: this.user.Username, movie: id}).subscribe(result => {
      this.user = result.data
      this.snackBar.open(result.message, 'OK', {
        duration: 2000
      })
    }, error => {
      this.snackBar.open(error.message, 'OK', {
        duration: 2000
      })
    })
  }

}
