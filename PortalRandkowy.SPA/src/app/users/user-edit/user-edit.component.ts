import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit()
  {
    this.route.data.subscribe(data =>
      {
        this.user = data.user;
      });
  }

  updateUser()
  {
    console.log(this.user);
    this.alertify.success('Profil pomyślnie zaaktualizowany');
    this.editForm.reset(this.user);
  }

}
