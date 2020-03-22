import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import {AuthService} from "../../services/auth.service";

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
    ) { }

  ngOnInit() {
      console.log("getProfile..");
      this.authService.user().subscribe(response => {
          console.log(response);
          this.profile = response.data;
      });
  }

}

