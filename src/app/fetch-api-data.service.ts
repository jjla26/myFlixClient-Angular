import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

/**
 * Declaring the api url that will provide data for the client app
 */
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

/**
 * Class for the API calls
 */
export class FetchApiDataService {

  constructor(private http: HttpClient) { }
  /**
   * Function that register the user in the backend
   * @param userDetails an object that should have: Username, Password, Email and Birthday
   * @returns an observable with the data of the user registered
   */
  public userRegistration(userDetails: any): Observable<any>{
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError))
  }

  /**
   * Function to login
   * @param userDetails an object that should have: Username and Password
   * @returns an observable with the data of the logged in user
   */
  public userLogin(userDetails: any): Observable<any>{
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
  }

  /**
   * Function to fetch all the movies
   * @returns an observable with all the movies
   */
  public getMovies(): Observable<any>{
    return this.http.get(apiUrl + 'movies', getHeaders()).pipe(catchError(this.handleError))
  }

  /**
   * Functions to get a movie by title
   * @param title movie title
   * @returns observable with the movie
   */
  public getMovie(title: string): Observable<any>{
    return this.http.get(apiUrl + `movies/${title}`).pipe(catchError(this.handleError))
  }

  /** Function to get the directors information
   * @param director director name
   * @return observable with directors information
   */
  public getDirector(director: string): Observable<any>{
    return this.http.get(apiUrl + `movies/${director}/director`).pipe(catchError(this.handleError))
  }

  /**
   * Function to get genre information
   * @param genre genre nmae
   * @returns observable with genre data
   */

  public getGenre(genre: any): Observable<any>{
    return this.http.get(apiUrl + `movies/${genre}/genre`).pipe(catchError(this.handleError))
  }

  /**
   * Function to get user info
   * @param name user name
   * @returns observable with users info
   */
  public getUser(name: string): Observable<any>{
    return this.http.get(apiUrl + `users/${name}`, getHeaders() ).pipe(catchError(this.handleError))
  }

  /**
   * Function to add a movie to favorites
   * @param details details object with user id and movie id
   * @returns an observable with the updated user info
   */

  public addToFavorite(details: any): Observable<any>{
    return this.http.post(apiUrl + `users/${details.user}/favorites/${details.movie}`, {},getHeaders()).pipe(catchError(this.handleError))
  }

  /**
   * Function to remove a movie from favorites
   * @param details details object with user id and movie id
   * @returns an observable with the updated user info
   */

  public deleteFavorite(details: any): Observable<any>{
    return this.http.delete(apiUrl + `users/${details.user}/favorites/${details.movie}`, getHeaders()).pipe(catchError(this.handleError))
  }

  /**
   * Function that updates user info
   * @param userDetails user details to be edited
   * @returns updated user info
   */

  public editUser(userDetails: any): Observable<any>{
    return this.http.put(apiUrl + `users/${userDetails.name}`, userDetails, getHeaders()).pipe(catchError(this.handleError))
  }

  /**
   * Function to remove an user
   * @param userId user id
   * @returns successful message
   */

  public deleteUser(userId: string): Observable<any>{
    return this.http.delete(apiUrl + `users/${userId}`, getHeaders()).pipe(catchError(this.handleError))
  }

  /**
   * Funtion to handle errors
   * @param error HttpErrorResponse
   * @returns Error
   */

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


