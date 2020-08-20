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
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.page.html',
  styleUrls: ['./exam-schedule.page.scss'],
})
export class ExamSchedulePage implements OnInit {
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

    console.log("get exam-schedule.");
    this.authService.examSchedule().subscribe(response => {
      console.log(response);

      let i;
      let j;
      let k;

      let dataAcadyearRows = response.data.map(item => item.ACADYEAR).filter((value, index, self) => self.indexOf(value) === index);
      if(dataAcadyearRows.length>0) {
        for (i = 0; i < 1; i++) {
          let acadyear = {Acadyear: "", Semester: []};
          let allDataAcadyears = response.data.filter(function (e) {
            return e.ACADYEAR == dataAcadyearRows[i];
          });

          this.arrayClassSchedule.STUDENTID = allDataAcadyears[0].STUDENTID;
          this.arrayClassSchedule.STUDENTCODE = allDataAcadyears[0].STUDENTCODE;
          acadyear.Acadyear = allDataAcadyears[0].ACADYEAR;

          let dataSemesterRows = allDataAcadyears.map(item => item.SEMESTER).filter((value, index, self) => self.indexOf(value) === index);
          for (j = 0; j < dataSemesterRows.length; j++) {
            let semester = {Semester: "", ChildCourse: []};
            semester.Semester = dataSemesterRows[j];

            let allDataSemesters = allDataAcadyears.filter(function (e) {
              return e.SEMESTER == dataSemesterRows[j];
            });

            for (k = 0; k < allDataSemesters.length; k++) {
              semester.ChildCourse.push({
                COURSECODE: allDataSemesters[k].COURSECODE,
                COURSENAME: allDataSemesters[k].COURSENAME,
                SECTION: allDataSemesters[k].SECTION,
                EXAMDATE: allDataSemesters[k].EXAMDATE,
                EXAMTIMEFROM: allDataSemesters[k].EXAMTIMEFROM,
                EXAMTIMETO: allDataSemesters[k].EXAMTIMETO,
                ROOMNAME: allDataSemesters[k].ROOMNAME,
                EXAMCODE: allDataSemesters[k].EXAMCODE,
              });
            }
            acadyear.Semester.push(semester);
          }

          this.arrayClassSchedule.row.push(acadyear);
        }
      }

    });

  }

}
