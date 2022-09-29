import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Event } from './Event';
import { EventService } from './event.service';
import { Apollo, ApolloBase, gql } from 'apollo-angular';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  filterArray: Event[] = [];
  EventList: Event[] = [];



  constructor(private apollo: Apollo,
    private EventService: EventService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private datePipe: DatePipe


  ) {

    this.filterArray = [];
    //console.log(this.EventList);
    // console.log(this.EventService);


    console.log("Test")

  }

  _searchTerm = '';
  filter(v: string) {
    return this.EventList.filter(x => x.name.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }
  ngOnInit(): void {


    this.editEvent = this.fb.group({
      id: [''],
      name: ['fwefwfwe', Validators.required],
      fromDate: ['1994-11-05', Validators.required],
      toDate: ['1994-11-05', Validators.required],
    });
    this.EventService.getEvents().subscribe((data: any) => {
      this.EventList = data;
      this.filterArray = data;
      console.log(data)
    });
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterArray = this.filter(val);
  }
  page = 1;
  pageSize = 7;


  config: any;
  editEvent: FormGroup | null = null;
  EventDetail: Event | null = null;

  joiningDate: string | null = null;
  ValidationMessage =
    [
      {
        name: { required: 'الاسم مطلوب' }
      }, {
        fromDate: { required: 'تاريخ بداية الدورة مطلوب' }
      }, {
        toDate: { required: 'تاريخ انتهاء الدورة مطلوب' }
      },
    ];
  formsErrors = [];



  deleteUser(id: number): void {
    if (this.filterArray) {
      this.filterArray = this.filterArray.filter(user => user.id !== id);
    }
  }


  logValidationErrors(group: FormGroup) {
    // Object.keys(group.controls).forEach((key: string) => {
    //     const ac = group.get(key);

    //     this.formsErrors[key] = '';
    //     if (ac && !ac.valid && (ac.touched || ac.dirty)) {
    //         const message = this.ValidationMessage[key];
    //         for (const errorKey in ac.errors) {
    //             if (errorKey) {
    //                 this.formsErrors[key] += message[errorKey] + '    ';
    //             }
    //         }
    //     }
    //     if (ac instanceof FormGroup) {
    //         this.logValidationErrors(ac)
    //     }
    // })
  }





  openModal(targetModal: NgbModal, Event: Event | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    console.log("targetModal >>>>> Event")
    console.log(Event)
    if (Event != null) {

      this.EventDetail = Event;
      this.editEvent?.patchValue({
        id: Event.id,
        name: Event.name,
        fromDate: Event.fromDate,
        toDate: Event.toDate,

      });

    }

  }

  onSubmit2() {

    this.modalService.dismissAll();
    console.log("onSubmit2 >>>>>>>>>>>>>>>>>>>>>")
    let id = this.editEvent?.value?.id
    let name = this.editEvent?.value?.name
    let fromDate = this.editEvent?.value?.fromDate
    let toDate = this.editEvent?.value?.toDate
    const Event: Event = {
      id: 0,
      name: name,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate)
    };
    this.EventService.AddEvent(Event).subscribe((data: any) => {
      console.log(data)
      //this.EventList.push(newP)
      this.filterArray = Object.assign([], this.filterArray);
      this.filterArray.push(data);
      //this.ngOnInit()
      console.log(this.filterArray)
    });
  }
  onSubmit() {

    this.modalService.dismissAll();
    console.log("onSubmit >>>>>>>>>>>>>>>>>>>>>")
    let id = this.editEvent?.value?.id
    let name = this.editEvent?.value?.name
    let fromDate = this.editEvent?.value?.fromDate
    let toDate = this.editEvent?.value?.toDate
    console.log(this.editEvent)
    console.log(id)
    console.log(name)
    console.log(fromDate)
    console.log(toDate)
    if (id) {

      let profilqe: Event = {
        id: id,
        name: name,
        fromDate: fromDate,
        toDate: toDate
      }
      console.log("Edit")
      this.updateEvent(profilqe)

    } else {






      console.log("new")
      const Create_Event = gql`
                                        mutation{
                                          createEvent(data: {id: 0, name: "Ahmed", 
                                                      fromDate: "1994-11-05T13:15:30Z", 
                                                      toDate: "1994-11-05T13:15:30Z"}) {
                                                      id
                                                      name
                                                      fromDate
                                                      toDate
                                                    }
                                        }
                                     `;


      this.apollo.mutate({
        mutation: Create_Event
      }).subscribe((result: any) => {
        console.log("Creater ---------------------------------------------")


        console.log(result)
        let newP: Event = result?.data?.createEvent
        console.log(newP)
        //this.EventList.push(newP)
        this.filterArray = Object.assign([], this.filterArray);
        this.filterArray.push(newP);
        //this.ngOnInit()
        console.log(this.filterArray)
      });

    }


    // this.updateEvent(Event) 
    //let name = this.editEvent?.value?.name


    // this.EventList = K;
    //   this.filterArray = K;

    this.EventDetail = null;

    //this.filterArray?.push()

    this.joiningDate = '';
    console.log("start this.ngOnInit()")
    this.ngOnInit();
    console.log("end this.ngOnInit()")


  }
  updateEvent(Event: Event): void {
    console.log(Event.id)
    const Create_Event_TITLE = gql` 
                     mutation{
                        UpdateEvent(data:{id:${Event.id}, name:"${Event.name}"}){
                          id
                        } 
                      }
                    `;
    console.log(Create_Event_TITLE.loc?.toJSON)
    this.apollo.mutate({
      mutation: Create_Event_TITLE
    }).subscribe((result: any) => {
      //console.log(result)
      console.log(result)
      console.log(this.filterArray)

      this.filterArray = this.filterArray?.map(p =>
        p.id === Event.id
          ? { ...p, name: Event.name }
          : p
      );


    });



  }

  deleteEvent(id: number): void {
    this.EventService.DeleteEvent(id).subscribe((data: any) => {
      if (this.filterArray) {
        this.filterArray = this.filterArray.filter(user => user.id !== id);
      }
      console.log(data)
    });
  }
  deleteEvent2(id: number): void {
    console.log(id)
    const Create_Event_TITLE = gql`
                      
                      mutation{
                          DeleteEvent(data:${id}){
                            id
                            name
                          }
                        } 
            `;
    console.log(Create_Event_TITLE.loc?.toJSON)
    this.apollo.mutate({
      mutation: Create_Event_TITLE
    }).subscribe((result: any) => {
      console.log(result)
      console.log(result)
      if (this.filterArray) {
        this.filterArray = this.filterArray.filter(user => user.id !== id);
      }

    });
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }


}


