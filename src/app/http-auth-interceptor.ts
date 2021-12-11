import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { UserService } from "./services/user.service";
import { UserDataDto } from "./types/user.dto";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    availableToken: boolean;



    constructor(private userService: UserService) {

        if(localStorage.getItem('TWTEE_TK!?') != null) {
            this.availableToken = true;
        }


    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {



        if (this.availableToken) {

            const tokenPayloadFromStorage: UserDataDto = JSON.parse(localStorage.getItem('TWTEE_TK!?'));
            const theToken = tokenPayloadFromStorage.token;

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${theToken}`)
            });

            return next.handle(authReq);


        } else {

            return next.handle(req);

        }






    }



}