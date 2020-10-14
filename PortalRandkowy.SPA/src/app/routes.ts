import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { LikesComponent } from './likes/likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';


export const appRoutes: Routes =
[
  {path: '', component: HomeComponent},
  {path:'',
   runGuardsAndResolvers: 'always',
   canActivate: [AuthGuard],
   children:
   [
    {path: 'uzytkownicy', component: UserListComponent, resolve: {users: UserListResolver}},
    {path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: {user: UserDetailResolver}},
    {path: 'uzytkownik/edycja', component: UserEditComponent, resolve: {user: UserEditResolver}},
    {path: 'polubienia', component: LikesComponent},
    {path: 'wiadomosci', component: MessagesComponent},
   ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
