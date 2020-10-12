import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { LikesComponent } from './likes/likes/likes.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AlertifyService } from './_services/alertify.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './_services/user.service';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';


export function tokenGetter()
{
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent,
      MessagesComponent,
      LikesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']

      }
    }),
    RouterModule.forRoot(appRoutes)

  ],
  providers: [AuthService, AlertifyService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
