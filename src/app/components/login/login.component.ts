import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(async value => {
      const result = await value;
      if (typeof result != 'undefined') {
        localStorage.setItem('TWTEE_TK!?', JSON.stringify(result));
        this.router.navigate(['/langing']);
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

}
