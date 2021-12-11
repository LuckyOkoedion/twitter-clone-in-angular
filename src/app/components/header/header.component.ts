import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  section: string = "";

  constructor(private appState: AppStateService) { }

  ngOnInit(): void {
    this.appState.getTitle().subscribe(value => {
      this.section = value;
    })
  }

}
