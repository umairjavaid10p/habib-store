import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedInUser: IUser;
  susbciptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.susbciptions.push(
      this.authService
        .getFirebaseLoggedInUser()
        .subscribe((user) => {
          this.loggedInUser = this.authService.getLoggedInUser();
        })
    );
  }

  logOut() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.loggedInUser = null;
  }

}
