import { AuthService } from './../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';


@Injectable()
export class MessagesListResolver implements Resolve<Message[]>
{
  pageNumber = 2;
  pageSize = 20;
  messageContainer = 'Nieprzeczytane';

  constructor(private userSevice: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userSevice.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe
    (
      catchError(error =>
        {
          this.alertify.error('Problem z wyszukiwaniem wiadomości');
          this.router.navigate(['']);
          return of(null);
        })
    );
  }

}
