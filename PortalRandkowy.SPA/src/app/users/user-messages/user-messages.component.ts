import { Component, Input, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css'],
})
export class UserMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages()
  {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .subscribe(messages =>{
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }
}
