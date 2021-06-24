import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteFavoriteService, GetMoviesService, GetUserService } from '../fetch-api-data.service'

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];

  constructor(
    public deleteFavorite: DeleteFavoriteService,
    public snackBar: MatSnackBar,
    public fetchMovies: GetMoviesService, 
    public fetchUser: GetUserService ) { }

  ngOnInit(): void {
    this.getFavorites()
  } 

  getFavorites(): void {
    this.user.name = localStorage.getItem('user') ? localStorage.getItem('user') : ''
    this.fetchUser.getUser(this.user.name).subscribe(user => {
      this.user = user.data
      this.fetchMovies.getMovies().subscribe(result => {
        this.movies = result.data.filter( (movie: any) => this.user.FavoriteMovies.includes(movie._id))
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  } 

  deleteFromFavorites(id: string): void{
    this.deleteFavorite.deleteFavorite({ user: this.user.Username, movie: id}).subscribe(result => {
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
