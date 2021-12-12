import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IComment, Twit } from 'src/app/interfaces/twit.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Comment, CommentDetail } from 'src/app/types/comment.dto';
import { Like } from 'src/app/types/like.dto';
import { PostDetail } from 'src/app/types/post.dto';
import { CurrentUserDto, UserDataDto, UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() theTwit: Twit;

  @Input() comments: IComment[];

  @Output() refreshCommentsEvent = new EventEmitter();

  currentUser: CurrentUserDto;

  allLikes: Like[] = [];

  newComment = "";

  constructor(
    private appStateService: AppStateService,
    private likeService: LikeService,
    private userService: UserService,
    private router: Router,
    private commentService: CommentService) {

  }

  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe(valu => {
      let theValu = valu;
      if (typeof theValu != 'undefined') {
        this.currentUser = theValu;
      }
    });

    if (typeof this.theTwit != 'undefined') {
      this.getLikes();
    }
  }

  addLike() {
    let user: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));
    let hasAlreadyLiked = this.allLikes.find(valu => valu.userWhoLiked == +user.userId);
    if (typeof hasAlreadyLiked == "undefined") {
      this.likeService.create({ postId: this.theTwit.id });
      this.getLikes();
      alert("Successfully liked the twit");
      console.log("Successfully liked the twit");
    } else {
      alert("No. You cannot like more than once.");
      console.log("No. You cannot like more than once.");
    }
  }

  addComment() {
    if (this.newComment === "") {
      alert("You cannot post an empty comment");
      console.log("You cannot post an empty comment");
    } else {
      this.commentService.create({ postId: this.theTwit.id, comment: this.newComment })
        .subscribe(async valu => {
          let result = await valu;
          if (typeof result != "undefined") {
            if (result) {
              // alert("comment added to twit successfully");
              // console.log("comment added to twit successfully");
              // this.refreshCommentsEvent.emit(this.theTwit);
              this.newComment = "";
              alert("Successfull ! but to see your comment, click on home and come back");
            } else {
              alert("Comment failed. Check your internet")
              console.log("Comment failed. Check your internet");
            }
          }
        });
    }

    if (this.newComment === "") {
      this.router.navigate(["/landing"]);
    }
  }

  private getLikes() {
    this.likeService.getAll().subscribe(async valu => {
      let theValu = await valu;
      if (typeof theValu != "undefined") {
        this.allLikes.length = 0;
        this.allLikes = [...theValu];
      }
    });
  }


}
