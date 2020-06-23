import {Component, OnInit} from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

import { ImagePage } from './../modal/image/image.page';
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  public profile : any;
  public arrayGrade = {
    STUDENTID:"",
    STUDENTCODE:"",
    row:[]
  };

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {

    console.log("getProfile..");
    this.authService.checkprofile().subscribe(response => {
      console.log(response);
      this.profile = response.data;
    });

    console.log("get mygrade..");
    this.authService.mygrade().subscribe(response => {
      console.log(response);

      let i;
      let j;
      let k;

    let dataAcadyearRows = response.data.map(item => item.ACADYEAR).filter((value, index, self) => self.indexOf(value) === index);
    for (i = 0; i < dataAcadyearRows.length; i++) {
      let acadyear = {Acadyear:"", Semester: []};
      let allDataAcadyears = response.data.filter(function (e) {
        return e.ACADYEAR == dataAcadyearRows[i];
      });

      this.arrayGrade.STUDENTID = allDataAcadyears[0].STUDENTID;
      this.arrayGrade.STUDENTCODE = allDataAcadyears[0].STUDENTCODE;
      acadyear.Acadyear = allDataAcadyears[0].ACADYEAR;

      let dataSemesterRows = allDataAcadyears.map(item => item.SEMESTER).filter((value, index, self) => self.indexOf(value) === index);
      for (j = 0; j < dataSemesterRows.length; j++) {
        let semester = {Semester:"", ChildCourse:[], GPA: "", GPAX: ""};
        semester.Semester = dataSemesterRows[j];

        let allDataSemesters = allDataAcadyears.filter(function (e) {
          return e.SEMESTER == dataSemesterRows[j];
        });

        semester.GPA = allDataSemesters[0].GPA;
        semester.GPAX = allDataSemesters[0].GPAX;

        for (k = 0; k < allDataSemesters.length; k++) {
          semester.ChildCourse.push({
            COURSEID: allDataSemesters[k].COURSEID,
            COURSECODE: allDataSemesters[k].COURSECODE,
            COURSENAME: allDataSemesters[k].COURSENAME,
            SECTION: allDataSemesters[k].SECTION,
            GRADE: allDataSemesters[k].GRADE,
            COURSEUNIT: allDataSemesters[k].COURSEUNIT,
          });
        }
        acadyear.Semester.push(semester);
      }

      this.arrayGrade.row.push(acadyear);
    }

  });

  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
