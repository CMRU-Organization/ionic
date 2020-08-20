import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, ToastController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {AppComponent} from "../../app.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  public profile : any;
  public studentcode: string;
  public errorMessage:string;
  public isActive:string;
  constructor(
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      private authService: AuthService,
      private appComponent: AppComponent
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.isActive = "none";
  }

  goToCheck() {
    console.log("Profile..");
    if (this.studentcode == null) {
      this.profile = null;
      this.isActive = "none";
    } else {

      this.authService.checkprofileNoneAuthen(this.studentcode).subscribe(response => {
            this.profile = response.data;
            this.appComponent.profile = response.data;
            this.isActive = "block";
          },
          error => {
            this.profile = null;
            this.errorMessage = "Not found user profile !!.";
            this.isActive = "none";
            console.log("Error", error);
          });
    }
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

}
