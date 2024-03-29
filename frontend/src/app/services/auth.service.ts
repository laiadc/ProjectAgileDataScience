import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import {User} from 'firebase';

import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate, OnDestroy {
  private userSubscription: Subscription;
  user: User | null;

  returnRoute: string;


  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) { 

    this.user = afAuth.auth.currentUser;
    this.userSubscription = this.afAuth.user.subscribe(async (user) => {

      if (this.user && user === null) {
        this.router.navigate(['/']);
      }
      this.user = user;
      
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.user /*&& (this.user.emailVerified)*/) {
      return true;
    }
    this.router.navigate(['sign-in'], { queryParams: { returnUrl: state.url }});
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
