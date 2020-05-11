import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    public profile : any;
   constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private authService: AuthService,
    private appComponent: AppComponent
    ) { }

  ngOnInit() {
      console.log("getProfile..");
      this.authService.checkprofile().subscribe(response => {
          console.log(response);
          this.profile = response.data;
          this.appComponent.profile = response.data;
      });
  }

}

