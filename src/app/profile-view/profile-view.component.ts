import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUserService, DeleteUserService, EditUserService } from '../fetch-api-data.service'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {}
  tempUser: any = {}
  update: boolean = false

  constructor(
    public fetchUser: GetUserService,
    public deleteUser: DeleteUserService,
    public updateUser: EditUserService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user.name = localStorage.getItem('user') ? localStorage.getItem('user') : ''
    this.fetchUser.getUser(this.user.name).subscribe(user => {
      this.user = user.data
      this.tempUser = { ...user.data}
    })
  }

  updateAcc(): void {
    this.updateUser.editUser({...this.tempUser, name: this.user.Username}).subscribe(result => {
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

  deleteAcc(): void {
    if(confirm('Are you sure you want to delete your account?')){
      this.deleteUser.deleteUser(this.user.Username).subscribe(result => {
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

  toggleUpdate(): void {
    this.update = !this.update
  }

}
