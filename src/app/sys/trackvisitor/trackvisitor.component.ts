 
import { AfterContentInit, AfterViewInit, Component, DoCheck, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { JopService } from "../tracking/jop.service";
import { Visitor_Logs } from "./visitorlogs";
import { Door } from "../door/door";
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/ar';
import { ExcelService } from "../Service/excel.service";
import { TrackService } from "./track.service";
@Component({
  selector: 'app-trackvisitor',
  templateUrl: './trackvisitor.component.html',
  styleUrls: ['./trackvisitor.component.scss']
})
export class TrackvisitorComponent implements OnInit {
  public showSidebar = false;
  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  public config: PerfectScrollbarConfigInterface = {};

  logz: Visitor_Logs[] = [];
  doors: Door[] = [];
  filjobs: Visitor_Logs[] = [];
  jobs: Visitor_Logs[] = [];
  _searchTerm = "";
  _locationsearch = "";
  page = 1;
  pageSize = 10;

  MainPage: Boolean = false;
  radioSelected: string = "";

  jobAdd: FormGroup;
  selectedImage: any = "assets/images/job/noimage.png";


  excelService: ExcelService = new ExcelService();

  constructor(
    public service: TrackService,
    //public authservices: AuthService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    intl: TimeagoIntl,) {  // 
    this.radioSelected = "all";

    this.jobAdd = this.fb.group({
      Title: ["", Validators.required],
      Location: ["", Validators.required],
      Description: ["", Validators.required],
      Qualification: ["", Validators.required],
      Icon: ["", Validators.required],
      JobType: ["", Validators.required],
      Nature: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.service.getLogsVisitors().subscribe((data: any) => {
console.log(data)

    } );
  }
  ngOnInit2(): void {
    this.service.getLogsVisitors().subscribe((data: any) => {
      this.logz = data;
      this.filjobs = []
      console.log(this.jobs)
      //let Roles : String[]= this.authservices.getRols()
      let Roles: String[] = ["MainDoor"];
      this.MainPage = false
      if (Roles.includes("MainDoor")) {
        this.MainPage = true
      } else {
        this.MainPage = false

        //        if (Roles.includes("D1")) this.filjobs.push(data[0])
        if (Roles.includes("D1")) {
          this.filjobs = this.jobs.filter((x) => x.door.id == 1);
        }
        if (Roles.includes("D2")) {
          this.filjobs = this.jobs.filter((x) => x.door.id == 2);
        }
        if (Roles.includes("D3")) {
          this.filjobs = this.jobs.filter((x) => x.door.id == 3);
        }
        if (Roles.includes("D4")) {
          this.filjobs = this.jobs.filter((x) => x.door.id == 4);
        }
      }

      console.log(this.filjobs)

    });

  }

}
