import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment, Twit } from 'src/app/interfaces/twit.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Comment, CommentDetail } from 'src/app/types/comment.dto';
import { PostDetail } from 'src/app/types/post.dto';
import { UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() theTwit: Twit;

  @Input() comments: IComment[];

  constructor(private appStateService: AppStateService,
    private commentService: CommentService) {

  }

  ngOnInit(): void {

  

  }


}
