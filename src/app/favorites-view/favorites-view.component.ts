import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})

/**
 * Favorites view to show the favorites movies
 */
export class FavoritesViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getFavorites()
  } 

  /**
   * Function to get the favorites movies of a user
   */
  getFavorites(): void {
    this.user.name = localStorage.getItem('user') ? localStorage.getItem('user') : ''
    this.fetchApiData.getUser(this.user.name).subscribe(user => {
      this.user = user.data
      this.fetchApiData.getMovies().subscribe(result => {
        this.movies = result.data.filter( (movie: any) => this.user.FavoriteMovies.includes(movie._id))
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  } 

  /**
   * Function to delete a movie from favorites
   * @param id movie ID
   */
  deleteFromFavorites(id: string): void{
    this.fetchApiData.deleteFavorite({ user: this.user.Username, movie: id}).subscribe(result => {
      console.log(this.movies, this.user)
      this.user = result.data
      this.movies = this.movies.filter(movie => result.data.FavoriteMovies.includes(movie._id))
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
