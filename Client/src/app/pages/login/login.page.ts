
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NavController,
  MenuController,
  ToastController,
  AlertController,
  LoadingController,
  ModalController
} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {AlertService} from "../../services/alert.service";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private storage: NativeStorage,
    private modalController: ModalController,
    private appComponent: AppComponent
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'studentcode': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'errorLogin': [null]
    });

  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you studentcode address to send a reset link password.',
      inputs: [
        {
          name: 'studentcode',
          placeholder: 'studentcode'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

// Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  goToHome() {
    console.log("Login..");
    this.authService.login(this.onLoginForm.value.studentcode, this.onLoginForm.value.password).subscribe(
        data => {
          this.alertService.presentToast("Logged In");
        },
        error => {
          console.log(error);
          this.onLoginForm.value.errorLogin = "Student code or password not correct";
        },
        () => {
          this.storage.setItem('studentcode', this.onLoginForm.value.studentcode);

          console.log("getProfile..");
          this.authService.user().subscribe(response => {
            console.log(response);
            this.appComponent.profile = response.data;
          });

          this.dismissLogin();
          this.navCtrl.navigateRoot('/home-results');
        }
    );
  }

}