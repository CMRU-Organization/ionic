import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  MenuController,
  ModalController,
  NavController,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.page.html',
  styleUrls: ['./class-schedule.page.scss'],
})
export class ClassSchedulePage implements OnInit {

  public profile : any;
  public arrayClassSchedule = {
    STUDENTID:"",
    STUDENTCODE:"",
    row:[]
  };
  constructor(    public navCtrl: NavController,
                  public menuCtrl: MenuController,
                  public popoverCtrl: PopoverController,
                  public alertCtrl: AlertController,
                  public modalCtrl: ModalController,
                  public toastCtrl: ToastController,
                  private authService: AuthService
  ) { }

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

        this.arrayClassSchedule.STUDENTID = allDataAcadyears[0].STUDENTID;
        this.arrayClassSchedule.STUDENTCODE = allDataAcadyears[0].STUDENTCODE;
        acadyear.Acadyear = allDataAcadyears[0].ACADYEAR;

        let dataSemesterRows = allDataAcadyears.map(item => item.SEMESTER).filter((value, index, self) => self.indexOf(value) === index);
        for (j = 0; j < dataSemesterRows.length; j++) {
          let semester = {Semester:"", ChildCourse:[]};
          semester.Semester = dataSemesterRows[j];

          let allDataSemesters = allDataAcadyears.filter(function (e) {
            return e.SEMESTER == dataSemesterRows[j];
          });

          for (k = 0; k < allDataSemesters.length; k++) {
            semester.ChildCourse.push({
              COURSECODE: allDataSemesters[k].COURSECODE,
              SECTION: allDataSemesters[k].SECTION,
              COURSENAME: allDataSemesters[k].COURSENAME,
              COURSEUNIT: allDataSemesters[k].COURSEUNIT,
              TEACHERNAME: allDataSemesters[k].TEACHERNAME,
              TIMEPERIODFROM: allDataSemesters[k].TIMEPERIODFROM,
              TIMEPERIODTO: allDataSemesters[k].TIMEPERIODTO,
            });
          }
          acadyear.Semester.push(semester);
        }

        this.arrayClassSchedule.row.push(acadyear);
      }

    });

  }

}
