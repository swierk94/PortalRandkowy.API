import { Pagination, PaginationResult } from './../../_models/pagination';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display:'Mężczyźni'},
                {value: 'female', display:'Kobiety'}];
  zodiacSignList = [{value: 'Wszystkie', display: 'Wszystkie'}];

  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.userParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userParams.zodiacSign = 'Wszystkie';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilters()
  {
    this.userParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userParams.zodiacSign = 'Wszystkie';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe( (res: PaginationResult<User[]>) =>
    {
      this.users = res.result;
      this.pagination = res.pagination;
    },
    error =>
    {
      this.alertify.error(error);
    }
    )
  }
}
