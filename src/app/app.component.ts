import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from './services/app-state.service';
import { UserService } from './services/user.service';
import { UserDataDto } from './types/user.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitee-lucky-okoedion';
  showDetail = false;
  loading: boolean;

  constructor(
    private appStateService: AppStateService,
    private userService: UserService,
    private router: Router) {
    this.userService.getIsLoading().subscribe(valu => {
      if (typeof valu != 'undefined') {
        this.loading = valu;
      }
    });

  }

  ngOnInit(): void {
    if (localStorage.getItem('TWTEE_TK!?') != null) {
      let theVal: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));
      if (theVal.token) {
        this.userService.isTokenOkay({ value: theVal.token }).subscribe(async valu => {
          let theV = await valu;
          if (typeof theV != 'undefined') {
            if (!theV) {
              this.userService.setCurrentUser(null);
              this.userService.setIsAuth(false);
              localStorage.removeItem('TWTEE_TK!?');
              this.router.navigate(["/login"]);
            }
          }
        })
      }
    }


  }



}
