import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() homeEvent = new EventEmitter();

  user = {
    name: "Lucky Okoedion",
    email: "luckyokoedion2000@gmail.com"
  }

  constructor(private router: Router,
    private userService: UserService,
    private appState: AppStateService
  ) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.homeEvent.emit();
    this.appState.setTitle("Home");
    // window.location.reload()

  }

  logout() {
    localStorage.removeItem('TWTEE_TK!?');
    this.router.navigate(['/login']);
  }

}
