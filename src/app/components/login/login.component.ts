import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CurrentUserDto, UserDetail } from 'src/app/types/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  theUser: UserDetail;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loading: boolean = false;
  loginFail: boolean = false;
  logIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.userService.setIsLoading(false);
    this.userService.getIsLoading().subscribe(valu => {
      if (typeof valu != 'undefined') {
        this.loading = valu;
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {


    this.userService.setIsLoading(true);
    setTimeout(() => {
      this.userService.setIsLoading(false);
      if (!this.logIn) {
        this.loginFail = true;
      }
    }, 5000)
    this.userService.login(this.loginForm.value)
      .subscribe(async value => {
        const result = await value;
        if (typeof result != 'undefined') {
          if (result) {
            this.loginFail = false;
            this.userService.getUserById(result.userId).subscribe(async valu => {
              let valuee = await valu;
              if (typeof valuee != "undefined") {
                this.theUser = valuee;
              }

              if (typeof this.theUser != "undefined") {
                let theP: CurrentUserDto = {
                  "email": this.theUser.email,
                  "name": this.theUser.name
                }

                const setState = new Promise<boolean>((resolve, reject) => {
                  this.logIn = true;
                  this.userService.setCurrentUser(theP);
                  this.userService.setIsAuth(true);
                  localStorage.setItem('TWTEE_TK!?', JSON.stringify(result));
                  this.userService.setIsLoading(false);
                  if (localStorage.getItem('TWTEE_TK!?') != null) {
                    resolve(true);
                  }
                })

                setState.then(valu => {
                  if (valu) {
                    this.router.navigate(['/langing']);
                  }
                });
              }
            });
          } else {
            this.userService.setIsLoading(false);
            this.loginFail = true;
          }
        }
      });


  }

  register() {
    this.router.navigate(['/register']);
  }

}
