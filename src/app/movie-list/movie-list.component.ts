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

  openGenreDialog(name: string, description: string): void{
    this.dialog.open( GenreViewComponent,{
      width: '400px',
      data: {
        name, 
        description
      }
    })

  }

  openDirectorDialog(name: string, bio: string): void{
    this.dialog.open( DirectorViewComponent,{
      width: '400px',
      data: {
        name, 
        bio
      } 
    })

  }

  openDescriptionDialog(description: string): void{
    this.dialog.open( DescriptionViewComponent,{
      width: '400px',
      data:{
        description
      }
    })

  }

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

  isFavorite(id: string): boolean {
    if(this.user.FavoriteMovies){
      return this.user.FavoriteMovies.includes(id)
    }else{
      return false
    }
  }

}
