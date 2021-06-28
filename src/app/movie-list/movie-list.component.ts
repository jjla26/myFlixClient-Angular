import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component'
import { DirectorViewComponent } from '../director-view/director-view.component'
import { DescriptionViewComponent } from '../description-view/description-view.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
/**
 * Movie list class component to render a reusable list of movies
 */

export class MovieListComponent implements OnInit {
  @Input() movies: any[] = [];
  @Input() user: any = {}
  @Input() deleteFromFavorites: any

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  /**
   * function to show information about genre
   * @param name genre name
   * @param description genre description
   */
  openGenreDialog(name: string, description: string): void{
    this.dialog.open( GenreViewComponent,{
      width: '400px',
      data: {
        name, 
        description
      }
    })
  }

  /**
   * function to show information about director
   * @param name director name
   * @param description director bio
   */
  openDirectorDialog(name: string, bio: string): void{
    this.dialog.open( DirectorViewComponent,{
      width: '400px',
      data: {
        name, 
        bio
      } 
    })
  }

  /**
   * Function to show synopsis of a movie
   * @param description movie description
   */
  openDescriptionDialog(description: string): void{
    this.dialog.open( DescriptionViewComponent,{
      width: '400px',
      data:{
        description
      }
    })
  }

  /**
   * Function to add a movie to the list of favorites
   * @param id movie id
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorite({ user: this.user.Username, movie: id}).subscribe(result => {
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

  /**
   * Functiont that checks if a movie is a favorite to show a different icon
   * @param id movie id
   * @returns boolean
   */
  isFavorite(id: string): boolean {
    if(this.user.FavoriteMovies){
      return this.user.FavoriteMovies.includes(id)
    }else{
      return false
    }
  }
}
