import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean;

  registerFail: boolean = false;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
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
    this.userService.create(this.registerForm.value).subscribe(async value => {
      let theValue = await value;
      if (typeof theValue != 'undefined') {
        this.userService.setIsLoading(false);
        this.router.navigate(['/login']);
      } else {
        this.registerFail = true;
        this.userService.setIsLoading(false);
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
