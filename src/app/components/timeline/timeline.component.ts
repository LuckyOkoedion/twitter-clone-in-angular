import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Twit } from 'src/app/interfaces/twit.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostDetail } from 'src/app/types/post.dto';
import { UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Output() detailEvent = new EventEmitter<Twit>();
  @Output() refreshTwitsEvent = new EventEmitter();


  @Input() twits: Twit[] = [];

  newTwit = "";

  loading: boolean;

  constructor(private appState: AppStateService,
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getIsLoading().subscribe(valu => {
      if (typeof valu != 'undefined') {
        this.loading = valu;
      }
    });
  }

  ngOnInit(): void {

  }

  sendTwit() {
    this.postService.create({ post: this.newTwit }).subscribe(async valu => {
      let theValu = await valu;
      if (typeof theValu != "undefined") {
        if (theValu.post) {
          alert("twit created.");
          console.log("twit created successfully");
          this.newTwit = "";
          // this.refreshTwitsEvent.emit();
          this.router.navigate(["/landing"]);
        } else {
          alert("Failed to create tweet");
          console.log("Failed to create tweet");
        }
      }
    });
  }

  toDetail(item: Twit) {
    this.detailEvent.emit(item);
  }


}
