import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInUser: IUser;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.loggedInUser) {
      this.router.navigate(['/']);
    } else {
      this.afterLogin();
    }
  }

  afterLogin() {
    this.isLoading = true;
    this.authService.afterLogin().then(result => {
      this.isLoading = false;
      if (result.user) {
        const user: IUser = {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.authService.login();
  }

}
