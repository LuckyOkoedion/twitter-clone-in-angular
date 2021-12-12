import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state.service';
import { UserService } from 'src/app/services/user.service';
import { CurrentUserDto, UserDataDto } from 'src/app/types/user.dto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() homeEvent = new EventEmitter();

  user: CurrentUserDto;
  loading: boolean;

  constructor(private router: Router,
    private userService: UserService,
    private appState: AppStateService
  ) {
    // this.userService.getIsLoading().subscribe(valu => {
    //   if(typeof valu != 'undefined') {
    //     this.loading = valu;
    //   }
    // });

    let userData: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));
    if (userData !== null) {
      this.userService.getUserById(userData.userId).subscribe(async valu => {
        let theValu = await valu;
        if (typeof valu != 'undefined') {
          let theResult: CurrentUserDto = {
            "email": theValu.email,
            "name": theValu.name
          };

          this.user = theResult;
        }
      })
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(valu => {
      if (typeof valu != "undefined") {
        this.user = valu;
      }
    });
  }

  goToHome() {
    this.homeEvent.emit();
    this.appState.setTitle("Home");
    // window.location.reload()

  }

  logout() {
    localStorage.removeItem('TWTEE_TK!?');
    this.userService.setIsAuth(false);
    this.userService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

}
