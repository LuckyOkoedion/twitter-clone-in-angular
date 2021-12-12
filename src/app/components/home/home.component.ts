import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IComment, Twit } from 'src/app/interfaces/twit.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentDetail } from 'src/app/types/comment.dto';
import { PostDetail } from 'src/app/types/post.dto';
import { UserDataDto, UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean;
  allUsers: UserDetail[] = [];
  allComments: CommentDetail[] = [];
  allPosts: PostDetail[] = [];
  chosenTwit: Twit;
  chosenComments: IComment[] = [];
  prepResult;

  allTwits: Twit[] = [];

  showDetail;

  constructor(private appState: AppStateService,
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {

    this.showDetail = false;
    this.userService.setIsLoading(false);

    this.userService.getIsLoading().subscribe(valu => {
      if (typeof valu != 'undefined') {
        this.loading = valu;
      }
    });
  }

  ngOnInit(): void {

    this.userService.getAll().subscribe(async usr => {
      let theUsr = await usr;
      this.allUsers.length = 0;
      this.allUsers = [...theUsr];
    });

    this.setAllPosts();
    this.setAllComments();


  }

  handleDetailEvent(value?: any) {

    this.chosenComments.length = 0;
    let processed = this.prepDetailData(value);
    this.chosenComments = [...processed];

    if (this.chosenComments.length > 0) {
      this.chosenTwit = value;
      this.appState.setSelectedTwit(value);
      this.appState.setTitle("Twit Detail");
      this.showDetail = true;
    }

  }

  handleHomeEvent(value?: any) {
    this.showDetail = false;
  }

  private prepDetailData(theChosen: Twit) {

    let theFiltered = this.allComments.filter(valu => valu.postId == theChosen.id);
    let theSpec: IComment[] = theFiltered.map(comm => {
      return {
        "comment": comm.comment,
        "commenter": this.getUserId(comm.userWhoCommented)
      }
    });

    return theSpec;

  }

  private getUserId(authorId: number): string {
    let theFilter = this.allUsers.find(valu => valu.id == authorId);
    return theFilter?.name;
  }


  handleRefreshDetailData(value?: any) {
    console.log(`refresh event param is: ${JSON.stringify(value)}`)
    if (value) {
      this.setAllPosts();
      this.setAllComments();
      this.handleDetailEvent(value);
    } else {
      window.location.reload();
    }
  }


  private setAllPosts() {
    this.postService.getAll().subscribe(async pos => {
      let thePos = await pos;
      if (typeof thePos != "undefined") {
        this.allPosts.length = 0;
        this.allPosts = [...thePos];
        let constructed: Twit[] = thePos.map(post => {
          let commentsCount: number = post.comments.length;
          let likesCount: number = post.likes.length;

          return {
            "id": post.id,
            "author": this.getUserId(post.author),
            "post": post.post,
            "likes": likesCount,
            "comments": commentsCount
          }
        });

        this.allTwits.length = 0;
        this.allTwits = [...constructed];
      }
    });

  }

  private setAllComments() {
    this.commentService.getAll().subscribe(async comm => {
      let theComm = await comm;
      if (typeof theComm != 'undefined') {
        this.allComments.length = 0;
        this.allComments = [...theComm];
      }
    });

  }


}
