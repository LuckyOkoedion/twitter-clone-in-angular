import { Component, OnInit } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitee-lucky-okoedion';
  showDetail = false;

  constructor(private appStateService: AppStateService) {

  }

  ngOnInit(): void {
   
  }



}
