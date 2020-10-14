import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { UserDetailComponent } from './../users/user-detail/user-detail.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class UserEditResolver implements Resolve<User>
{
  /**
   *
   */
  constructor(private userSevice: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userSevice.getUser(this.authService.decodedToken.nameid).pipe
    (
      catchError(error =>
        {
          this.alertify.error('Problem z pobraniem danych');
          this.router.navigate(['/uzytkownicy']);
          return of(null);
        })
    );
  }

}
