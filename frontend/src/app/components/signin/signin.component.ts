import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../Models/user';

import {Router, RouterStateSnapshot,} from '@angular/router';

import {Subscription} from 'rxjs';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';

  returnRoute: string;

  private userSubscription: Subscription;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    
    this.userSubscription = this.afAuth.user.subscribe(async (user) => {
      if (user) {
        this.router.navigate(['/']);
        
      }
    });
  }

  ngOnInit() {
  }

  async register(){

    let user;
    try{
      
      user = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
      
    } catch (error) {
      console.log('error', error);
      alert(error['message']);
      return;
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}


