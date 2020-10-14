import { Component } from '@angular/core';
import { UserEditComponent } from './../users/user-edit/user-edit.component';
import { CanDeactivate } from '@angular/router';


export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent>
{
  canDeactivate(component: UserEditComponent)
  {
    if(component.editForm.dirty)
    {
      return confirm("Jesteś pewnie że chcesz kontynuuować? Wszelkie niezapisane zmiany zostaną utracone");
    }
    return true;
  }

}
