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

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.create(this.registerForm.value).subscribe(async value => {
      this.router.navigate(['/login']);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
