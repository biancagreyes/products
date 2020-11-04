import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';
//import { SignInComponent } from 'src/app/sign-in/sign-in.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public isAuthenticated: Observable<boolean>;
  userClaims: any;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });
    this.isAuthenticated = this.userService.isAuthenticated();
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

}
