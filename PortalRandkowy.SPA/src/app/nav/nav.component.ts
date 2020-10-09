import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model).subscribe(next => {
      console.log('Zalogowałeś się do aplikacji');
    }, error => {
      console.log('Wystąpił błąd logowania');
    }
    );
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout()
  {
    localStorage.removeItem('token');
    console.log('Zostałeś wylogowany');
  }




}
