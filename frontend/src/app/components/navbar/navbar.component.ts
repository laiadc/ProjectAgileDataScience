import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {User} from 'firebase';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private userSubscription: Subscription;
  user: User | null;

  constructor(
    public afAuth: AngularFireAuth
  ) { 
    this.afAuth.user.subscribe(async (user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

}
