import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any)
  {
    if (this.editForm.dirty)
    {
     $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit()
  {
    this.route.data.subscribe(data =>
      {
        this.user = data.user;
      });
  }

  updateUser()
  {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
        .subscribe(next =>
          {
            this.alertify.success('Profil pomyślnie zaaktualizowany');
            this.editForm.reset(this.user);
          }, error =>
          {
            this.alertify.error(error);
          });
  }
}
