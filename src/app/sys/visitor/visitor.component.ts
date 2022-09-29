
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Visitor, visible } from './visitor';
import { VisitorService } from './visitor.service';
import { Gender } from '../gender/gender';
import { Profile } from '../profile/profile';
import { Event } from '../Event/Event';
import { Door } from '../door/door';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { Ministry } from '../ministry/Ministry';
import { Bank } from '../bank/bank';
import { Directorate } from '../directorate/directorate';
import { Department } from '../department/department';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {
  selectedProfile: number = 0
  visitorList: Visitor[] = [];
  newVisitor: Visitor = new Visitor();
  Visibles: visible = new visible();

  myvisitor: Visitor = new Visitor();
  genders: Gender[] = [];
  events: Event[] = [];
  doors: Door[] = [];
  ministries: Ministry[] = [];
  profiles: Profile[] = [];
  filterArray: Visitor[] = [];
  Banks: Bank[] = [];

  visitorDetail: Visitor | null = null;
  config: any;
  editvisitor: FormGroup | null = null;
  fromDate: string | null = null;
  toDate: string | null = null;
  page = 1;
  pageSize = 100;

  _searchTerm = '';
  Directorates: Directorate[] = [];
  Departments: Department[] = [];
  fDepartments: Department[] = [];

  constructor(private visitorService: VisitorService, public authservices: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private datePipe: DatePipe) {

    this.visitorService.getGenders().subscribe((data: any) => {
      this.genders = data;
    });
    this.visitorService.getProfiles().subscribe((data: any) => {
      this.profiles = [];
      console.warn(this.authservices.GetUsername())
      let Username = this.authservices.GetUsername()
      let Roles: String[] = this.authservices.getRols()

      if (!Roles.includes("Administrator")) {
        this.profiles = [];
        if (Roles.includes("P1")) this.profiles.push(data[0])
        if (Roles.includes("P2")) this.profiles.push(data[1])
        if (Roles.includes("P3")) this.profiles.push(data[2])
        if (Roles.includes("P4")) this.profiles.push(data[3])

      } else {
        this.profiles = data;
      }
      console.log("(------------------------------------)")
      console.log(this.profiles)
    });
    this.visitorService.getvisitors2().subscribe((data: any) => {

      this.visitorList = data;
      this.filterArray = [];


      let Roles: String[] = this.authservices.getRols()

      console.log(Roles)


      console.log(Roles)


      console.log(Roles)




      if (!Roles.includes("Administrator")) {
        let prof: Number[] = []
        Roles.forEach(element => {
          if (element.length === 2 && element.startsWith("P")) {
            prof.push(Number(element[1]))
          }
        });
        console.log(prof)
        const r = data.filter((x: any) => prof.includes(x.Profile.id));
        console.log("r");
        console.log(r);
        this.visitorList = r;
        this.filterArray = r;
      } else {
        this.filterArray = data;
        this.visitorList = this.filterArray;
      }


      console.log(data)
      console.log(this.filterArray)
    });



    this.visitorService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
    this.visitorService.getMinistries().subscribe((data: any) => {
      this.ministries = data;
    });

    this.visitorService.getBanks().subscribe((data: any) => {
      this.Banks = data;
    });


    this.visitorService.getDirectorates().subscribe((data: any) => {
      this.Directorates = data;
    });
    this.visitorService.getDepartments().subscribe((data: any) => {
      this.Departments = data;
      this.fDepartments = [];
    });

    this.visitorService.getDoors().subscribe((data: any) => {
      this.doors = data;
    });
    //this.filterArray = this.visitorList;

  }


  onChangeObj(newObj: number) {
    this.selectedProfile = newObj;

    this.Visibles = new visible();


    switch (Number(newObj)) {
      case 0:
        console.log("It is a Nothing.");
        break;
      case 1: {
        console.log("It is a VIP.");
        this.Visibles.h_Name = true
        this.Visibles.h_Department = true
        this.Visibles.h_Directorate = true
        this.Visibles.job_description = true
        this.Visibles.destination = true
        this.Visibles.fromDate = true
        this.Visibles.Ministry = true
        this.Visibles.Bank = true
        this.Visibles.Department = true
        this.Visibles.Directorate = true
        break;
      }

      case 2: {
        console.log("It is a زائر.");
        this.Visibles.h_Name = true
        this.Visibles.h_Department = true
        this.Visibles.h_Directorate = true
        this.Visibles.mobile = true
        this.Visibles.Department = true
        this.Visibles.Directorate = true
        break;
      }
      case 3: {
        console.log("It is a مخول.");
        this.Visibles.h_Name = true
        this.Visibles.h_Department = true
        this.Visibles.h_Directorate = true
        this.Visibles.job_description = true
        this.Visibles.mobile = true
        this.Visibles.Ministry = true
        this.Visibles.Bank = true
        this.Visibles.Department = true
        this.Visibles.Directorate = true
        break;
      }
      case 4: {
        console.log("It is a متدرب.");
        this.Visibles.h_Name = true
        this.Visibles.h_Department = true
        this.Visibles.h_Directorate = true
        this.Visibles.job_description = true
        this.Visibles.Ministry = true
        this.Visibles.Bank = true
        this.Visibles.Event = true
        this.Visibles.Department = true
        this.Visibles.Directorate = true
        break;
      }
      default:
        console.log("No such day exists!");
        break;
    }


    // ... do other stuff here ...
  }

  onChangeDirectorate(newObj: number) {
    console.log("------------------------------------ ");



    let sd: number = Number(newObj)
    //this.fDepartments = this.Departments.filter(x => Number(x.directorateId) === Number(sd));
    this.fDepartments = this.Departments.filter((obj) => { return obj.directorateId as number === sd; });

  }


  ngOnInit() {
    this.editvisitor = this.fb.group({
      id: [''],
      fullname: ['', Validators.required],
      email: [''],
      mobile: [''],
      fromDate: [''],
      toDate: [''],
      job_description: [''],
      destination: [''],
      h_Name: [''],
      h_Department: [''],
      h_Directorate: [''],
      Profile: ['', Validators.required],
      Gender: [''],
      Event: [''],
      Door: ['', Validators.required],
      Department: [''],
      Directorate: [''],
      Ministry: [''],
      Bank: [''],
    });
  }

  //search...
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterArray = this.filter(val);
  }

  filter(v: string) {
    return this.visitorList.filter(x => x.fullname.toLowerCase().indexOf(v.toLowerCase()) !== -1
      //|| x.Email.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
  }


  // validation...
  ValidationMessage =
    [
      {
        fullname: { required: 'الاسم الكامل مطلوب' }
      },
      {
        Profile: { required: 'نوع الزائر مطلوب' }
      },
      {
        Door: { required: 'البوابة مطلوبه' }
      }
    ];

  formsErrors = [];


  logValidationErrors(group: FormGroup) {

  }

  // delete visitor...
  deletevisitor(id: number): void {
    if (this.filterArray) {
      // this.visitorService.deletevisitor(id);
      this.visitorService.deletevisitor(id).subscribe((data: any) => {
        console.log(data)
        this.filterArray = this.filterArray.filter(visitor => visitor.id !== data.id);

      });
    }
  }


  // open model...
  openModal(targetModal: NgbModal, visitor: Visitor | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.editvisitor = this.fb.group({
      id: [''],
      fullname: ['', Validators.required],
      email: [''],
      mobile: [''],
      fromDate: [''],
      toDate: [''],
      job_description: [''],
      destination: [''],
      h_Name: [''],
      h_Department: [''],
      h_Directorate: [''],
      note: [''],
      Profile: ['', Validators.required],
      Gender: [''],
      Event: [''],
      Door: ['', Validators.required],
      Department: [''],
      Directorate: [''],
      Ministry: [''],
      Bank: [''],
    });

    if (visitor != null) {

      if (visitor.fromDate) {
        this.fromDate = this.datePipe.
          transform(new Date(visitor.fromDate), 'yyyy-MM-dd');
      }
      if (visitor.toDate) {
        this.toDate = this.datePipe.
          transform(new Date(visitor.toDate), 'yyyy-MM-dd');
      }
      this.visitorDetail = visitor;
      this.editvisitor?.patchValue({
        fullname: visitor.fullname,
        mobile: visitor.mobile,
        fromDate: visitor.fromDate,
        toDate: visitor.toDate,
        Profile: visitor.Profile,
        Gender: visitor.Gender,
        email: visitor.email,
        destination: visitor.destination,
        job_description: visitor.job_description,
        h_Name: visitor.h_Name,
        h_Department: visitor.h_Department,
        h_Directorate: visitor.h_Directorate,
        Event: visitor.Event,
        Door: visitor.Door
      });
    }

  }

  // on submit data rom model...
  onSubmit() {
    if (this.filterArray != null && this.visitorDetail) {
      const index = this.filterArray.indexOf(this.visitorDetail);


      if (this.editvisitor != null) {
        this.visitorDetail.fullname = this.editvisitor.get('fullname')?.value;
        this.visitorDetail.mobile = this.editvisitor.get('mobile')?.value;
        this.visitorDetail.fromDate = this.editvisitor.get('fromDate')?.value;
        this.visitorDetail.toDate = this.editvisitor.get('toDate')?.value;
        this.visitorDetail.Profile = this.editvisitor.get('Profile')?.value;
        this.visitorDetail.Event = this.editvisitor.get('Event')?.value;
        this.visitorDetail.Gender = this.editvisitor.get('Gender')?.value;
        this.visitorDetail.Door = this.editvisitor.get('Door')?.value;

        this.visitorDetail.Bank = this.editvisitor.get('Bank')?.value;
        this.visitorDetail.Ministry = this.editvisitor.get('Ministry')?.value;
        this.visitorDetail.Department = this.editvisitor.get('Department')?.value;
        this.visitorDetail.Directorate = this.editvisitor.get('Directorate')?.value;


        this.visitorDetail.email = this.editvisitor.get('email')?.value;
        this.visitorDetail.mobile = this.editvisitor.get('mobile')?.value;
        this.visitorDetail.destination = this.editvisitor.get('destination')?.value;
        this.visitorDetail.job_description = this.editvisitor.get('job_description')?.value;
        this.visitorDetail.h_Name = this.editvisitor.get('h_Name')?.value;
        this.visitorDetail.h_Department = this.editvisitor.get('h_Department')?.value;
        this.visitorDetail.h_Directorate = this.editvisitor.get('h_Directorate')?.value;
        this.visitorDetail.note = this.editvisitor.get('note')?.value;
      }

      this.filterArray[index] = this.visitorDetail;
      this.visitorService.updatevisitor(index, this.visitorDetail);
    } else {
      this.visitorDetail = new Visitor();

      if (this.filterArray)
        this.visitorDetail.id = Math.max.apply(Math, this.filterArray.map(function (o) { return o.id; })) + 1;

      this.visitorDetail.fullname = this.editvisitor?.get('fullname')?.value;
      this.visitorDetail.mobile = this.editvisitor?.get('mobile')?.value;
      this.visitorDetail.fromDate = new Date();
      this.visitorDetail.toDate = new Date();
      this.visitorDetail.Profile = this.editvisitor?.get('Profile')?.value;
      this.visitorDetail.Gender = this.editvisitor?.get('Gender')?.value;
      this.visitorDetail.Event = this.editvisitor?.get('Event')?.value;
      this.visitorDetail.Door = this.editvisitor?.get('Door')?.value;




      this.visitorDetail.Bank = this.editvisitor?.get('Bank')?.value;
      this.visitorDetail.Ministry = this.editvisitor?.get('Ministry')?.value;
      this.visitorDetail.Department = this.editvisitor?.get('Department')?.value;
      this.visitorDetail.Directorate = this.editvisitor?.get('Directorate')?.value;

      this.visitorDetail.email = this.editvisitor?.get('email')?.value;
      this.visitorDetail.mobile = this.editvisitor?.get('mobile')?.value;
      this.visitorDetail.destination = this.editvisitor?.get('destination')?.value;
      this.visitorDetail.job_description = this.editvisitor?.get('job_description')?.value;
      this.visitorDetail.h_Name = this.editvisitor?.get('h_Name')?.value;
      this.visitorDetail.h_Department = this.editvisitor?.get('h_Department')?.value;
      this.visitorDetail.h_Directorate = this.editvisitor?.get('h_Directorate')?.value;
      this.visitorDetail.note = this.editvisitor?.get('note')?.value;
      //this.visitorService.addvisitor(this.visitorDetail);
      // this.filterArray = Object.assign([], this.visitorDetail);
      //this.filterArray.push(collectionPageDbModel);
      console.log("--------------------------")
      console.log(this.visitorDetail)

      console.log("-------------------------- ", this.editvisitor?.get('fromDate')?.value)
      this.myvisitor.id = this.visitorDetail.id
      this.myvisitor.fullname = this.visitorDetail.fullname

      this.myvisitor.mobile = this.visitorDetail.mobile
      this.myvisitor.email = this.visitorDetail.email
      this.myvisitor.destination = this.visitorDetail.destination
      this.myvisitor.job_description = this.visitorDetail.job_description
      this.myvisitor.fullname = this.visitorDetail.fullname
      this.myvisitor.h_Name = this.visitorDetail.h_Name
      this.myvisitor.h_Department = this.visitorDetail.h_Department
      this.myvisitor.h_Directorate = this.visitorDetail.h_Directorate
      this.myvisitor.note = this.visitorDetail.note



      this.myvisitor.Bank = this.Banks.find(element => element.id == (Number)(this?.visitorDetail?.Bank)) || new Bank()
      this.myvisitor.Ministry = this.ministries.find(element => element.id == (Number)(this?.visitorDetail?.Ministry)) || new Ministry()
      this.myvisitor.Department = this.Departments.find(element => element.id == (Number)(this?.visitorDetail?.Department)) || new Department()
      this.myvisitor.Directorate = this.Directorates.find(element => element.id == (Number)(this?.visitorDetail?.Directorate)) || new Directorate()

      this.myvisitor.Profile = this.profiles.find(element => element.id == (Number)(this?.visitorDetail?.Profile)) || new Profile()
      this.myvisitor.Gender = this.genders.find(element => element.id == (Number)(this?.visitorDetail?.Gender)) || new Gender()
      this.myvisitor.Event = this.events.find(element => element.id == (Number)(this?.visitorDetail?.Event)) || new Event()
      this.myvisitor.Door = this.doors.find(element => element.id == (Number)(this?.visitorDetail?.Door)) || new Door()
      this.myvisitor.fromDate = this.visitorDetail.fromDate
      this.myvisitor.toDate = this.visitorDetail.toDate
      console.log("this.myvisitor              >")
      console.log(this.myvisitor)
      if (this.myvisitor?.Profile?.id == 1) {
        this.myvisitor.fromDate = new Date(this.datePipe.transform(new Date(this.editvisitor?.get('fromDate')?.value || new Date()), 'yyyy-MM-dd') || new Date());
        this.myvisitor.toDate = new Date(this.datePipe.transform(new Date(this.editvisitor?.get('fromDate')?.value || new Date()), 'yyyy-MM-dd') || new Date());
      }
      if (this.myvisitor?.Profile?.id == 2) {
        this.myvisitor.fromDate = new Date(this.datePipe.transform(new Date(new Date()), 'yyyy-MM-dd') || new Date());
        this.myvisitor.toDate = new Date(this.datePipe.transform(new Date(new Date()), 'yyyy-MM-dd') || new Date());
      }
      if (this.myvisitor?.Profile?.id == 3) {
        this.myvisitor.fromDate = new Date(this.datePipe.transform(new Date(new Date()), 'yyyy-MM-dd') || new Date());
        this.myvisitor.toDate = new Date(this.datePipe.transform(new Date(new Date()), 'yyyy-MM-dd') || new Date());
      }
      if (this.myvisitor?.Profile?.id == 4) {
        this.myvisitor.fromDate = new Date(this.datePipe.transform(new Date(this.myvisitor?.Event?.fromDate || new Date()), 'yyyy-MM-dd') || new Date());
        this.myvisitor.toDate = new Date(this.datePipe.transform(new Date(this.myvisitor?.Event?.toDate || new Date()), 'yyyy-MM-dd') || new Date());
      }
      console.log("this.myvisitor              ++++++++++++++++")
      console.log(this.myvisitor)
      console.log("this.myvisitor              <")


      this.visitorService.addvisitor(this.myvisitor).subscribe((data: any) => {
        console.log("addvisitor    >>>>>")

        console.log(data)
      });
      this.filterArray = Object.assign([], this.filterArray);
      this.filterArray.push(this.myvisitor);
      //this.filterArray.console.log(data)(this.visitorDetail); 
    }
    this.modalService.dismissAll();
    this.visitorDetail = null;

    this.fromDate = '';
    this.ngOnInit();

  }

  // close model...
  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

}
