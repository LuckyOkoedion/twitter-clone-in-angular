import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment, CommentDetail, CreateCommentDto } from '../types/comment.dto';
import { UserDataDto } from '../types/user.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiUrl = "https://twitee-lucky-okoedion.herokuapp.com/comment"

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

  create(theDto: CreateCommentDto): Observable<Promise<CommentDetail>> {
    const postData = JSON.stringify(theDto);
    return this.http.post<Promise<CommentDetail>>
      (this.apiUrl, postData, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<CommentDetail>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  getById(id: any): Observable<Promise<CommentDetail>> {
    return this.http.get<Promise<CommentDetail>>
      (this.apiUrl + `/${id}`, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<CommentDetail>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  getAll(): Observable<Promise<CommentDetail[]>> {
    return this.http.get<Promise<CommentDetail[]>>
      (this.apiUrl, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<CommentDetail[]>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }


  update(id: any, theDto: any): Observable<Promise<CommentDetail>> {
    return this.http.put<Promise<CommentDetail>>
      (this.apiUrl + `/${id}`, theDto, this.reqOptions)
      .pipe(
        map(async (value: HttpResponse<Promise<CommentDetail>>) => {
          const theValue = await value.body
          return theValue;
        })
      )
  }

  delete(id: any) {
    return this.http.delete(this.apiUrl + `/${id}`, this.reqOptions);
  }


}
