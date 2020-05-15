import {Component, OnInit} from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import {AuthService} from "./services/auth.service";
import {NativeStorage} from "@ionic-native/native-storage/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public profile : any;

  constructor(
      private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
      private storage: NativeStorage,
  ) {
    this.appPages = [
      {
        title: 'ผลการเรียน',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'ข่าวประชาสัมพันธ์',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    console.log("Logout");
    this.authService.logout();
    this.navCtrl.navigateRoot('/');
  }
}
