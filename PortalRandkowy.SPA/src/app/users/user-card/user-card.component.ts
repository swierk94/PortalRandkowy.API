import { error } from 'protractor';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService)
  {

  }

  ngOnInit() {
  }

  sendLike(id: number)
  {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
                    .subscribe( data =>{
                      this.alertify.success('Polubiłeś: ' + this.user.username);
                    }, error =>{
                      this.alertify.error(error);
                    });
  }

}
