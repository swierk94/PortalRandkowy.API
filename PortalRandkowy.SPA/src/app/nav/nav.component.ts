import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit()
  {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login()
  {
    this.authService.login(this.model).subscribe(next => {
     this.alertify.success('Zalogowałeś się do aplikacji');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/uzytkownicy']);
    }
    );
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.curentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message('Zostałeś wylogowany');
    this.router.navigate(['/home']);

  }




}
