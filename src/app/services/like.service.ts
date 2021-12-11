import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateLikeDto, Like } from '../types/like.dto';
import { UserDataDto } from '../types/user.dto';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  apiUrl = "https://twitee-lucky-okoedion.herokuapp.com/like"

  lLeadToken: { userId: number, token: string }


  reqOptions: any;


  constructor(private http: HttpClient) {


    const tokenPayloadFromStorage: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));

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

  create(theDto: CreateLikeDto): Observable<Promise<Like>> {
    const postData = JSON.stringify(theDto);
    return this.http.post<Promise<Like>>
      (this.apiUrl, postData, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<Like>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  getById(id: any): Observable<Promise<Like>> {
    return this.http.get<Promise<Like>>
      (this.apiUrl + `/${id}`, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<Like>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  getAll(): Observable<Promise<Like[]>> {
    return this.http.get<Promise<Like[]>>
      (this.apiUrl, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<Like[]>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }


  update(id: any, theDto: any): Observable<Promise<Like>> {
    return this.http.put<Promise<Like>>
      (this.apiUrl + `/${id}`, theDto, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<Like>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  delete(id: any) {
    return this.http.delete(this.apiUrl + `/${id}`, this.reqOptions);
  }

}
