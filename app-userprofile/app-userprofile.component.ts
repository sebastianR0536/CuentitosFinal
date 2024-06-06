import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserToolsService } from '../services/user-tools.service';
import { User } from '../services/interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
@Component({
  selector: 'app-app-userprofile',
  templateUrl: './app-userprofile.component.html',
  styleUrls: ['./app-userprofile.component.css']
})

export class AppUserprofileComponent implements OnInit, OnDestroy {
  dates: boolean = true;
  userInformation?: User;
  suscribe!: Subscription;
  notifications = false;
  viewnoti = false;

  constructor(private userTools: UserToolsService, public authService: AuthService, public router: Router, private fire: FirestoreService) {
    console.log(this.authService.isLoggedIn)
    !this.authService.isLoggedIn ? this.router.navigate(['/']) : null
  }
  public User: any = sessionStorage.getItem('user');
  public Userdata: any = sessionStorage.getItem('user');


  ngOnInit() {
    this.User = JSON.parse(this.User);
    // this.Userdata = this.User;
    // this.User = this.User.providerData[0];
    this.suscribe = this.userTools.getUser(this.User.uid)
      .subscribe(user => {
        this.userInformation = user.payload.data() as User;
        if (this.userInformation.notifications?.length != undefined && this.userInformation.notifications?.length > 0){
          this.notifications = true;
        }
        this.viewnoti = true;
      })
  }

  ngOnDestroy(): void {
    this.authService.isLoggedIn?this.suscribe.unsubscribe():null
  }

  mostrardatos(state: boolean) {
    this.dates = state;
  }

  algo() {
    console.log("AAAAAAAAAAAAAAa")
  }

  deleteNotifications(){
    let user: User = this.userInformation!;
    user.notifications = [];
    this.fire.updateUser(this.userInformation!.uid!, user)
    this.notifications = false;
  }
}
