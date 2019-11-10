import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async register(){
    // TODO ADd DB info user
    try{
      const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      user.user.updateProfile({
        displayName: this.name
      });

      this.router.navigate([''])
    } catch (error) {
      console.log('error', error);
    }
    
  }


}
