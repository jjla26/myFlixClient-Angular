import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviesapi-node.herokuapp.com/'
const getHeaders = () => {
  const authToken = localStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    })
  }
  return httpOptions
}
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

@Injectable({
  providedIn: 'root'
})
// Get all the movies end-point
export class GetMoviesService {

  constructor(private http: HttpClient) { }
  
  public getMovies(): Observable<any>{
    return this.http.get(apiUrl + 'movies', getHeaders()).pipe(catchError(this.handleError))
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

@Injectable({
  providedIn: 'root'
})
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

@Injectable({
  providedIn: 'root'
})
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

@Injectable({
  providedIn: 'root'
})
//Get user end-point
export class GetUserService {

  constructor(private http: HttpClient) { }

  public getUser(name: string): Observable<any>{
    return this.http.get(apiUrl + `users/${name}`, getHeaders() ).pipe(catchError(this.handleError))
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

@Injectable({
  providedIn: 'root'
})
// Add a movie to favourite Movies end-point
export class AddFavoriteService {

  constructor(private http: HttpClient) { }

  public addToFavorite(details: any): Observable<any>{
    return this.http.post(apiUrl + `users/${details.user}/favorites/${details.movie}`, {},getHeaders()).pipe(catchError(this.handleError))
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

@Injectable({
  providedIn: 'root'
})
//Delete movie from favorites end-point
export class DeleteFavoriteService {

  constructor(private http: HttpClient) { }

  public deleteFavorite(details: any): Observable<any>{
    return this.http.delete(apiUrl + `users/${details.user}/favorites/${details.movie}`, getHeaders()).pipe(catchError(this.handleError))
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

@Injectable({
  providedIn: 'root'
})
//Edit user end-point
export class EditUserService {

  constructor(private http: HttpClient) { }

  public editUser(userDetails: any): Observable<any>{
    return this.http.put(apiUrl + `users/${userDetails.name}`, userDetails, getHeaders()).pipe(catchError(this.handleError))
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
//Delete user end-point
export class DeleteUserService {

  constructor(private http: HttpClient) { }

  public deleteUser(userId: string): Observable<any>{
    return this.http.delete(apiUrl + `users/${userId}`, getHeaders()).pipe(catchError(this.handleError))
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

