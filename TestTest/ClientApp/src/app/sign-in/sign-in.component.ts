import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  message = null;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmit(userName, password) {
    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.message = "Incorrect username and password combination"
      });
  }

  resetForm(form?: NgForm) {
    form.reset();
  }


}
