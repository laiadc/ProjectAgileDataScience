import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../Models/user';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';

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

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async register(){
    // TODO ADd DB info user
    try{
      const usersCollections = this.afs.collection<User>('users');
      const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      user.user.updateProfile({
        displayName: this.name
      });
      usersCollections.doc(user.user.uid).set({
        uid: user.user.uid,
        name: this.name,
        surname: this.surname,
        collegiateNumber: this.collegiateNumber,
        email: this.email
      });

      this.router.navigate([''])
    } catch (error) {
      console.log('error', error);
    }
    
  }


}
