import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../Models/user';

import {doctors} from './doctors';

import {Router, RouterStateSnapshot,} from '@angular/router';

import {Subscription} from 'rxjs';

import * as levenshtein from 'fast-levenshtein';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name: string = '';
  surname: string = '';
  collegiateNumber: string = '';
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

  checkDoctor(): boolean {
    const completeName = doctors[this.collegiateNumber];
    if (!completeName) {
      alert('Collegiate Number not found');
      return true;
    }
    const constructCompletName = this.name.trim() + " " + this.surname.trim();
    const distance = levenshtein.get(completeName, constructCompletName.toUpperCase());
    if (distance > 3) {
      alert('Collegiate Number and name not maching');
      return true;
    }
    return false;
  }

  async register(){
    
    if (this.name.length < 1) {
      alert('The name is not valid.');
      return;
    }

    if (this.surname.length < 1) {
      alert('The surname is not valid.');
      return;
    }
    if (this.collegiateNumber.length < 1 || this.collegiateNumber.length > 8) {
      alert('The Collegiate Number is not valid.');
      return;
    }
    if (this.checkDoctor()) {
      return;
    }

    let user;
    try{
      
      user = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      
    } catch (error) {
      console.log('error', error);
      alert(error['message']);
      return;
    }
    user.user.updateProfile({
      displayName: this.name
    });

    const usersCollections = this.afs.collection<User>('users');
    usersCollections.doc(user.user.uid).set({
      uid: user.user.uid,
      name: this.name,
      surname: this.surname,
      collegiateNumber: this.collegiateNumber,
      email: this.email
    });

    this.router.navigate(['']);
    
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

