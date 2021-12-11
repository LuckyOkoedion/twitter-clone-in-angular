import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Twit } from 'src/app/interfaces/twit.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { PostService } from 'src/app/services/post.service';
import { PostDetail } from 'src/app/types/post.dto';
import { UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Output() detailEvent = new EventEmitter<Twit>();


  @Input() twits: Twit[] = [];

  newTwit = "";

  constructor(private appState: AppStateService,
    private postService: PostService) {

  }

  ngOnInit(): void {

  }

  sendTwit() {
    this.postService.create({ post: this.newTwit }).subscribe();
    this.newTwit = "";
  }

  toDetail(item: Twit) {
    this.detailEvent.emit(item);
  }


}
