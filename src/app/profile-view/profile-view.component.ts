import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

/**
 * Profile view component to show the profile view
 */
export class ProfileViewComponent implements OnInit {
  user: any = {}
  tempUser: any = {}
  update: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  /**
   * Getting the user information on the first render
   */
  ngOnInit(): void {
    this.user.name = localStorage.getItem('user') ? localStorage.getItem('user') : ''
    this.fetchApiData.getUser(this.user.name).subscribe(user => {
      this.user = user.data
      this.tempUser = { ...user.data}
    })
  }

  /**
   * Function to update users info
   */
  updateAcc(): void {
    this.fetchApiData.editUser({...this.tempUser, name: this.user.Username}).subscribe(result => {
      localStorage.setItem('user', result.data.Username)
      this.user = result.data
      this.update = false
      this.snackBar.open(result.message, 'OK', {
        duration: 2000
      });
    }, error => {
      console.log(error)
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    })
  }

  /**
   * Function that deletes an user
   */
  deleteAcc(): void {
    if(confirm('Are you sure you want to delete your account?')){
      this.fetchApiData.deleteUser(this.user.Username).subscribe(result => {
        localStorage.clear()
        this.router.navigate(['welcome'])
        this.snackBar.open(result.message, 'OK', {
          duration: 2000
        });
      }, error => {
        this.snackBar.open(error, 'OK', {
          duration: 2000
        });
      })
    }
  }

  /**
   * Function to allow a user to edit 
   */
  toggleUpdate(): void {
    this.update = !this.update
  }

}
