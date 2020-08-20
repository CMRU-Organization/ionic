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

    function GetWEEKDAY(weekday){
      if(weekday == "1"){
        return "อา.";
      }
      else if(weekday == "2"){
        return "จ.";
      }
      else if(weekday == "3"){
        return "อ.";
      }
      else if(weekday == "4"){
        return "พ.";
      }
      else if(weekday == "5"){
        return "พฤ.";
      }
      else if(weekday == "6"){
        return "ศ.";
      }

    }
    function GetStartTime(time){
      if(time == "1"){
        return "08:00";
      }
      else if(time == "2"){
        return "09:00";
      }
      else if(time == "3"){
        return "10:00";
      }
      else if(time == "4"){
        return "11:00";
      }
      else if(time == "5"){
        return "12:00";
      }
      else if(time == "6"){
        return "13:00";
      }
      else if(time == "7"){
        return "14:00";
      }
      else if(time == "8"){
        return "15:00";
      }
      else if(time == "9"){
        return "16:00";
      }
      else if(time == "10"){
        return "17:00";
      }
    }
    function GetEndTime(time){
      if(time == "1"){
        return "09:00";
      }
      else if(time == "2"){
        return "10:00";
      }
      else if(time == "3"){
        return "11:00";
      }
      else if(time == "4"){
        return "12:00";
      }
      else if(time == "5"){
        return "13:00";
      }
      else if(time == "6"){
        return "14:00";
      }
      else if(time == "7"){
        return "15:00";
      }
      else if(time == "8"){
        return "16:00";
      }
      else if(time == "9"){
        return "17:00";
      }
      else if(time == "10"){
        return "18:00";
      }
    }

    console.log("getProfile..");
    this.authService.checkprofile().subscribe(response => {
      console.log(response);
      this.profile = response.data;
    });

    console.log("get class-schedule.");
    this.authService.classSchedule().subscribe(response => {
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

              let periodTxt = GetWEEKDAY(allDataSemesters[k].WEEKDAY) + " " + GetStartTime(allDataSemesters[k].TIMEPERIODFROM) + " - " + allDataSemesters[k].TIMEPERIODTO;

              semester.ChildCourse.push({
                COURSECODE: allDataSemesters[k].COURSECODE,
                SECTION: allDataSemesters[k].SECTION,
                COURSENAME: allDataSemesters[k].COURSENAME,
                COURSEUNIT: allDataSemesters[k].COURSEUNIT,
                TEACHERNAME: allDataSemesters[k].TEACHERNAME,
                TIMEPERIODFROM: allDataSemesters[k].TIMEPERIODFROM,
                TIMEPERIODTO: allDataSemesters[k].TIMEPERIODTO,
                WEEKDAY: allDataSemesters[k].WEEKDAY,
                PERIODTXT: periodTxt
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
