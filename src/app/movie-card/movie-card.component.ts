import { Component, OnInit } from '@angular/core';
import { GetMoviesService, GetUserService, AddFavoriteService, DeleteFavoriteService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchMovies: GetMoviesService,
    public fetchUser: GetUserService,
    public addFavorite: AddFavoriteService,
    public deleteFavorite: DeleteFavoriteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void{
    this.fetchMovies.getMovies().subscribe((resp: any) => {
      const name = localStorage.getItem('user')
      this.fetchUser.getUser(name ? name : '').subscribe(result => {
        this.user = result.data
      })
      this.movies = resp.data
      return this.movies
    })
  }

  deleteFromFavorites(id: string): void{
    this.deleteFavorite.deleteFavorite({ user: this.user.Username, movie: id}).subscribe(result => {
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
