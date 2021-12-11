import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserDataDto } from '../types/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth: boolean;
  loading: boolean = true;

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('LLEAD_TK!?') != null) {
      return true;
    } else {
      let urlTree = this.router.createUrlTree(["/login"]);
      return urlTree;
    }

  }

}
