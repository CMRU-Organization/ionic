import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {

  constructor(
      public menuCtrl: MenuController,
      public navCtrl: NavController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  gotoCheck() {
    this.navCtrl.navigateRoot('/check');
  }

  gotoLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
