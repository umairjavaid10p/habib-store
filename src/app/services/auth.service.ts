import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login() {
    return this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  getLoggedInUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  afterLogin() {
    return this.afAuth.auth.getRedirectResult();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getFirebaseLoggedInUser() {
    return this.afAuth.authState;
  }
}
