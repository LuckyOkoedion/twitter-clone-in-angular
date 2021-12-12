import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthDto, CreateUserDto, CurrentUserDto, LoginDto, User, UserDataDto, UserDetail } from '../types/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  lLeadToken: { userId: number; token: string; } | undefined;

  headerValue: any;

  reqOptions: any;

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  currentUser: Subject<CurrentUserDto> = new Subject();

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    private http: HttpClient,
    private router: Router) {


    // this.lLeadToken = null;

    this.apiUrl = "https://twitee-lucky-okoedion.herokuapp.com/user";


    let tokenPayloadFromStorage: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));

    if (tokenPayloadFromStorage !== null) {

      this.reqOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokenPayloadFromStorage?.token}`
        },
        responseType: "json" as const,
        observe: "response" as const
      }

    } else {

      this.reqOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        responseType: "json" as const,
        observe: "response" as const
      }

    }



  }


  create(theDto: CreateUserDto): Observable<Promise<any>> {
    const postData = JSON.stringify(theDto);
    return this.http.post<Promise<any>>
      (this.apiUrl, postData, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<any>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }



  login(theDto: CreateUserDto): Observable<Promise<AuthDto>> {
    const postData = JSON.stringify(theDto);
    return this.http.post<Promise<AuthDto>>
      (this.apiUrl + '/login/', postData, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<AuthDto>>) => {
          const theValue = await value.body
          // if (typeof theValue != "undefined") {
          //   localStorage.setItem('TWTEE_TK!?', JSON.stringify(theValue));
          // }
          return theValue;
        })
        // catchError((er: any) => {
        //   if (er) {
        //     this.setIsLoading(false);
        //   }

        //   return throwError(er);
        // })
      )
  }


  async logout() {
    localStorage.removeItem('TWTEE_TK!?');
    this.router.navigate(['/login']);
  }


  isTokenOkay(token: { value: string }): Observable<Promise<boolean>> {
    const postData = JSON.stringify(token);
    return this.http.post<Promise<boolean>>
      (this.apiUrl + '/isTokenOkay', postData, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<boolean>>) => {
          const theBody = await value.body;
          return theBody;
        })
      )
  }


  getUserById(id: any): Observable<Promise<UserDetail>> {
    return this.http.get<Promise<UserDetail>>
      (this.apiUrl + `/${id}`, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<UserDetail>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }


  setIsAuth(value: boolean) {
    this.isAuth.next(value);
  }

  getIsAuth() {
    return this.isAuth.asObservable();
  }


  setCurrentUser(usr: CurrentUserDto) {
    this.currentUser.next(usr);
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  setIsLoading(value: boolean) {
    this.isLoading.next(value);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }




  getAll(): Observable<Promise<UserDetail[]>> {
    return this.http.get<Promise<UserDetail[]>>
      (this.apiUrl, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<UserDetail[]>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }


  update(id: any, theDto: any): Observable<Promise<UserDetail>> {
    return this.http.put<Promise<UserDetail>>
      (this.apiUrl + `/${id}`, theDto, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<UserDetail>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  delete(id: any) {
    return this.http.delete(this.apiUrl + `/${id}`, this.reqOptions);
  }

  private randomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


}
