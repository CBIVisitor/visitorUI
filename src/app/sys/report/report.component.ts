import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { Profile } from '../profile/profile';
import { AuthService } from "src/app/auth/Service/auth.service";
import { ExcelService } from '../Service/excel.service';
import { Visitor_Logs } from '../tracking/visitorlogs';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {


  selectedProfile: number = 0

  fromDate: Date | undefined;
  toDate: Date | undefined;
  logz: Visitor_Logs[] = []
  profiles: Profile[] = [];
  selectedItems: Profile[] = [];
  selectedProfiles: Profile[] = [];
  dropdownSettings = {};


  page = 1;
  pageSize = 100000;

  ngOnInit() {
    this.reportService.getProfiles().subscribe((data: any) => {
      this.profiles = data;
      let Roles: String[] = this.authservices.getRols()
      console.log(Roles)
      console.log(Roles.includes("P1"))
      console.log(Roles.includes("P2"))
      console.log(Roles.includes("P3"))
      console.log(Roles.includes("P4"))

     

    //  if (Roles.includes("MainDoor")) 
      if (!Roles.includes("Administrator")) {
        if (!Roles.includes("P1")) this.profiles = this.profiles.filter(x => x.id != 1) 
        if (!Roles.includes("P2")) this.profiles = this.profiles.filter(x => x.id != 2) 
        if (!Roles.includes("P3")) this.profiles = this.profiles.filter(x => x.id != 3) 
        if (!Roles.includes("P4")) this.profiles = this.profiles.filter(x => x.id != 4) 
      }


      console.log(this.profiles)
    });

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'إختيار الجميع',
      unSelectAllText: 'إلغاء خيار الجميع',
      itemsShowLimit: 5,
      idField: 'id',
      textField: 'bio',
      allowSearchFilter: false
    };
  }
  

    
  constructor(public reportService: ReportService, public excelService: ExcelService ,public authservices: AuthService,) {

     

      //this.fromDate = calendar.getToday();
      //this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);

    }

    OnSebmit() {



      //console.log("fromDate  =  ", this.fromDate)

      ///console.log("toDate    =  ", this.toDate)
      console.log(this.selectedItems.length) 
      if (!this.fromDate) {
        console.log("fromDate  =  ", this.fromDate)
        alert(" يرجى تحديد التاريخ")
      } else if (!this.toDate) {
        console.log("toDate  =  ", this.toDate)
        alert("يرجى تحديد التاريخ")
     // } else if (this.selectedItems.length === 0) { alert("يرجى تحديد نوع زائر")
      } else {

        this.selectedItems.forEach(element => {
          console.log(element)
        });

        let Today: Date = new Date(new Date(this.fromDate).toISOString().split('T')[0])
        let Tom: Date = new Date(new Date(this.toDate).toISOString().split('T')[0])
        console.log(Today)
        console.log(Tom)
        this.reportService.getLogsVisitorsPeriod(Today, Tom).subscribe((data: any) => {

          console.log(data)
          this.logz = data;
          console.log(this.logz)
          if (this.selectedItems.length == 0 || this.selectedItems.length  == 4){

          }else{

            console.log(this.selectedItems)

            this.logz = this.logz.filter((el) => {
              return this.selectedItems.some((f) => {
                return f.id === el.Visitor.Profile.id && f.bio === el.Visitor.Profile.bio;
              });
            });
            console.log("In Fillter")
            console.log(this.logz)
          }
          console.log(this.logz)

        });

        //alert("كلشي لوز")
      }

 
    }

  OnSebmit2() {


    let Today: Date = new Date(new Date().toISOString().split('T')[0])
    let Tom: Date = new Date(new Date().toISOString().split('T')[0])
    console.log(Today)
    console.log(Tom)
    this.reportService.getLogsVisitorsPeriod(Today, Tom).subscribe((data: any) => {

      console.log(data)
      this.logz = data;
      console.log(this.logz)
    });

  }
  GetData(){
    let element = document.getElementById('tblData');
   // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    let Table = document.getElementById("tblData")
    console.log(element)
    this.excelService.exportAsExcelFile2(element,"test")
  }
  }
