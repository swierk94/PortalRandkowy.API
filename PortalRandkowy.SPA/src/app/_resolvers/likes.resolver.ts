import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { UserDetailComponent } from './../users/user-detail/user-detail.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LikesResolver implements Resolve<User>
{
  pageNumber = 1;
  pageSize = 12;
  likesParam = 'UserLikes';

  constructor(private userSevice: UserService,
              private router: Router,
              private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userSevice.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe
    (
      catchError(error =>
        {
          this.alertify.error('Problem z pobraniem danych');
          this.router.navigate(['']);
          return of(null);
        })
    );
  }

}
