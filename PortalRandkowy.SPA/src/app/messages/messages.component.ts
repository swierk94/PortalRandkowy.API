import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Pagination, PaginationResult } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { error } from 'protractor';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  flagaOutbox = false;
  messages: Message[];
  pagination: Pagination;
  messageContainer = "Nieprzeczytane";

  constructor(private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit()
  {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.message.pagination;
    })
  }

  loadMessages()
  {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
                                 this.pagination.itemsPerPage, this.messageContainer)
                                 .subscribe((res: PaginationResult<Message[]>) => {
                                   this.messages = res.result;
                                   this.pagination = res.pagination;

                                   if (res.result[0].messageContainer == 'Outbox')
                                   {
                                     this.flagaOutbox = true;
                                   }
                                   else
                                   {
                                     this.flagaOutbox = false;
                                   }

                                 }, error => {
                                   this.alertify.error(error);
                                 });



  }

  deleteMessage(id: number)
  {
    this.alertify.confirm('Czy na pewno chcesz usunąć tę wiadomość?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Wiadomość została usunieta');
      }, error =>{
        this.alertify.error('Nie udało się usunąć wiadomości');
      })
    });
  }

  pageChanged(event: any): void
  {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
