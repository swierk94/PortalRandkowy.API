import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input()
  valuesFromHome: any;
  @Output()
  cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;
  zodiacSignList =
  [
  {value: 'Rak', display: 'Rak'},
  {value: 'Inne', display: 'Inne'}
  ];

 userParams: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit()
  {
    this.createRegisterForm();
    this.bsConfig =
    {
      containerClass: 'theme-green'
    };
  }

  createRegisterForm()
  {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
      gender: ['kobieta'],
      city: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      zodiacSign: ['', Validators.required],
    },
    {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup)
  {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {mismatch: true};
  }

  register()
  {
    if (this.registerForm.valid)
    {
       this.user = Object.assign({}, this.registerForm.value);
       this.authService.register(this.user).subscribe
    (()  =>  {
                this.alertify.success('rejestracja udana');
             },
                error => {
                this.alertify.error(error);
                    },
                    () => {
                      this.authService.login(this.user).subscribe(() =>
                      {
                        this.router.navigate(['/uzytkownicy']);
                      })
                    }
    );
    }
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('Anulowano');
  }

}
