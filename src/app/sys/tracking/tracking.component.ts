 
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
import { AuthService } from "src/app/auth/Service/auth.service";
 
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
}) 

export class TrackingComponent implements OnInit {
  public showSidebar = false;
  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  public config: PerfectScrollbarConfigInterface = {};

  logz: Visitor_Logs[] = [];
  doors: Door[] = [];
  filjobs: Visitor_Logs[] = [];
  jobs: Visitor_Logs[] = [];
  _searchTerm = '';
  _locationsearch = "";
  page = 1;
  pageSize = 10;
 
  MainPage: Boolean = false;
  radioSelected: string = "";

  jobAdd: FormGroup;
  selectedImage: any = "assets/images/job/noimage.png";


  excelService: ExcelService = new ExcelService();

  constructor(
    public service: JopService, 
    public authservices: AuthService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    intl: TimeagoIntl,) {


    intl.strings = englishStrings;
    intl.changes.next();






    // 
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


  sales: any = []
  ngOnInit2(): void {
 


  }
  ngOnInit(): void {

    this.service.getLogsVisitors().subscribe((data: any) => {
      this.logz = data;
      this.jobs = data;

      this.filjobs = []
      console.log(this.jobs)
      let Roles : String[]= this.authservices.getRols()
      console.log(Roles)
      this.MainPage = false
      if (Roles.includes("MainDoor")) {
        this.MainPage = true
        this.filjobs = data;
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
    this.service.getDoors().subscribe((data: any) => {
      console.log(data)
      this.doors = [...data]
    });
    this.selectedImage = "assets/images/job/noimage.png";
  }

 
  GetData() {

    this.excelService.exportAsExcelFile(this.filjobs, "Ahmed")
  }
  ChangeGate() {
    this.MainPage = !this.MainPage
  }

  setMainDoorIn(id: number) {

    this.service.setMainDoorIn(id).subscribe((data: any) => {
      this.filjobs = this.filjobs?.map(p =>
        p.id === id
          ? { ...p, mainDoorIn: new Date(data) }
          : p
      );
    });
  }
  setMainDoorOut(id: number) {
    this.service.setMainDoorOut(id).subscribe((data: any) => {
      this.filjobs = this.filjobs?.map(p =>
        p.id === id
          ? { ...p, mainDoorOut: new Date(data) }
          : p
      );
    });
  }

  setSubDoorIn(id: number) {
    this.service.setSubDoorIn(id).subscribe((data: any) => {
      console.log(this.filjobs)
      this.filjobs = this.filjobs?.map(p =>
        p.id === id
          ? { ...p, subDoorIn: new Date(data) }
          : p
      );
    });


  }
  setSubDoorOut(id: number) {
    this.service.setSubDoorOut(id).subscribe((data: any) => {
      this.filjobs = this.filjobs?.map(p =>
        p.id === id
          ? { ...p, subDoorOut: new Date(data) }
          : p
      );
    });
  }

  // ============================================================================
  get searchTerm(): string {
    
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this.radioSelected = "all";
    this._searchTerm = val;
    console.log(this.filjobs)
    this.filjobs = this.filter(val);
    console.log(this.filjobs)
  } 
  filter(v: string) {

    return this.jobs.filter(
      (x) => x.Visitor.fullname.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
  }

  // ==============================================================================

  get locationsearch(): string {
    return this._locationsearch;
  }
  set locationsearch(val: string) {
    this.radioSelected = "all";
    this._locationsearch = val;
    this.filjobs = this.filterLoc(val);
  }

  //Ahmed
  filterLoc(v: string) {
    return this.jobs.filter(
      //(x) => x.door.name.toLowerCase().indexOf(v.toLowerCase()) !== -1
      (x) => x.Visitor.fullname.toLowerCase().indexOf(v.toLowerCase()) !== -1

    );
  }

  // ===========================================================================================

  onItemChange(item: Door) {
    // console.log(this.filjobs)
    // console.log(this.jobs)
    //debugger; 


    if (item.name === "all") {
      this.filjobs = this.jobs;
    } else {
      this.filjobs = this.jobs.filter((x) => x.door.id == item.id);
    }
  }

  //==========================================================================================

  openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
    });
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  

  preview(files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.selectedImage = reader.result;
    };
  }
}

