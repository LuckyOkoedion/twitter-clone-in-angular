import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Twit } from '../interfaces/twit.interface';
import { CommentDetail } from '../types/comment.dto';
import { PostDetail } from '../types/post.dto';
import { UserDetail } from '../types/user.dto';
import { CommentService } from './comment.service';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  allUsers: Subject<UserDetail[]> = new Subject();
  allPosts: Subject<PostDetail[]> = new Subject();
  allComments: Subject<CommentDetail[]> = new Subject();
  selectedTwit: Subject<Twit> = new Subject();
  detailState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  title: BehaviorSubject<string> = new BehaviorSubject<string>("Home");

  constructor(private userService: UserService,
    private postService: PostService,
    private commentService: CommentService) { }

  getSelectedTwit() {
    return this.selectedTwit.asObservable();
  }

  setAllUsers() {
    this.userService.getAll().subscribe(async value => {
      let theValue = await value;
      if (typeof theValue != "undefined") {
        this.allUsers.next(theValue);
      }
    });
  }

  getAllUsers() {
    return this.allUsers.asObservable();
  }

  setAllPosts() {
    this.postService.getAll().subscribe(async value => {
      let theValue = await value;
      if (typeof theValue != "undefined") {
        this.allPosts.next(theValue);
      }
    });
  }

  getAllPosts() {
    return this.allPosts.asObservable();
  }

  setAllComments() {
    this.commentService.getAll().subscribe(async value => {
      let theValue = await value;
      if (typeof theValue != "undefined") {
        this.allComments.next(theValue);
      }
    });
  }

  getAllComments() {
    return this.allComments.asObservable();
  }

  setSelectedTwit(value: Twit) {
    this.selectedTwit.next(value);
  }

  getDetailState() {
    return this.detailState.asObservable();
  }

  setDetailState(value: boolean) {
    this.detailState.next(value);
  }

  getTitle() {
    return this.title.asObservable();
  }

  setTitle(value: string) {
    this.title.next(value);
  }

}
