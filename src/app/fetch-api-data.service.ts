import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviesapi-node.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})

// User registration endpoint 
export class UserRegistrationService {

  constructor(private http: HttpClient) { }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any>{
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    let errorMessage
    if(error.error instanceof ErrorEvent){
      errorMessage = `Some error ocurred:' ${error.error.message}`
    }else{
      errorMessage = error.error.message
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error.message}`)
    }
    return throwError(errorMessage)
  }
}

@Injectable({
  providedIn: 'root'
})
//User login endpoint
export class UserLoginService {

  constructor(private http: HttpClient) { }

  public userLogin(userDetails: any): Observable<any>{
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    let errorMessage
    if(error.error instanceof ErrorEvent){
      errorMessage = `Some error ocurred:' ${error.error.message}`
    }else{
      errorMessage = error.error.message
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error.message}`)
    }
    return throwError(errorMessage)
  }
}

// Get all the movies end-point
export class GetMoviesService {

  constructor(private http: HttpClient) { }
  
  public getMovies(): Observable<any>{
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Get movie by title service
export class GetMovieService {

  constructor(private http: HttpClient) { }
  
  public getMovie(title: string): Observable<any>{
    return this.http.get(apiUrl + `movies/${title}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Get director end-point
export class GetDirectorService {

  constructor(private http: HttpClient) { }
  
  public getDirector(director: string): Observable<any>{
    return this.http.get(apiUrl + `movies/${director}/director`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Get genre end-point
export class GetGenreService {

  constructor(private http: HttpClient) { }
  public getGenre(genre: any): Observable<any>{
    return this.http.get(apiUrl + `movies/${genre}/genre`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Get user end-point
export class GetUserService {

  constructor(private http: HttpClient) { }

  public getUser(name: string): Observable<any>{
    return this.http.get(apiUrl + `users/${name}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

// Add a movie to favourite Movies end-point
export class AddFavoriteService {

  constructor(private http: HttpClient) { }

  public addToFavorite(details: any): Observable<any>{
    return this.http.post(apiUrl + `movies/${details.user}/favorites/${details.movie}`, details).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Delete movie from favorites end-point
export class DeleteFavoriteService {

  constructor(private http: HttpClient) { }

  public deleteFavorite(details: any): Observable<any>{
    return this.http.delete(apiUrl + `movies/${details.user}/favorites/${details.movie}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Edit user end-point
export class EditUserService {

  constructor(private http: HttpClient) { }

  public editUser(userDetails: any): Observable<any>{
    return this.http.put(apiUrl + `users/${userDetails.id}`, userDetails).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

//Delete user end-point
export class DeleteUserService {

  constructor(private http: HttpClient) { }

  public deleteUser(userId: string): Observable<any>{
    return this.http.delete(apiUrl + `users/${userId}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error ocurred:', error.error.message);
    }else{
      console.error(        
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later')
  }
}

