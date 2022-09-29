import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VisitorComponent } from './visitor/visitor.component';
import { VisitLogsComponent } from './visit-logs/visit-logs.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router'; 
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { GenderComponent } from './gender/gender.component';
import { EventComponent } from './event/event.component';
import { DoorComponent } from './door/door.component'; 

import { TimeagoClock, TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { AgoComponent } from './ago/ago.component';
import { Observable } from 'rxjs';
import { ReportComponent } from './report/report.component';
import { TlooDComponent } from './tloo-d/tloo-d.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BankComponent } from './bank/bank.component';
import { MinistryComponent } from './ministry/ministry.component';
import { DepartmentComponent } from './department/department.component';
import { DirectorateComponent } from './directorate/directorate.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackvisitorComponent } from './trackvisitor/trackvisitor.component';
const routes: Routes = [
  {
    path: '', 
    canActivate:[AuthGuard],
    children: [
      {
        path: 'Home',
        component: HomeComponent,
        data: {
          title: 'Home', 
        }
      },
      {
        path: 'Person',
        component: PersonComponent,
        data: {
          title: 'Person', 
        }
      },
      {
        path: 'Ago',
        component: AgoComponent,
      },
      {
        path: 'TlooD',
        component: TlooDComponent,
      },
      {
        path: 'Log',
        component: VisitLogsComponent,
        data: {
          title: 'Log', 
        }
      },
      {
        path: 'Profile',
        component: ProfileComponent,
        data: {
          title: 'Profile', 
        }
      },
       {
        path: 'tracking',
        component: TrackingComponent,
        data: {
          title: 'tracking',

        }
      }, 
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Report',
        }
      },
      {
        path: 'event',
        component: EventComponent,
        data: {
          title: 'event',
        }
      },
      {
        path: 'Visitor',
        component: VisitorComponent  ,
      data: {
        title: 'Visitor',
      }
      },
    ]
  },

];
 

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}

@NgModule({
  declarations: [
    VisitorComponent,
    ProfileComponent,
    VisitLogsComponent,
    HomeComponent,
    PersonComponent,
    GenderComponent,
    EventComponent,
    DoorComponent, 
    AgoComponent,
    ReportComponent,
    TlooDComponent,
    BankComponent,
    MinistryComponent,
    DepartmentComponent,
    DirectorateComponent,
    TrackingComponent,
    TrackvisitorComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,   
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    DragDropModule,
    FlatpickrModule.forRoot(),
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    HttpClientModule,
    FeatherModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    NgbModalModule,
    RouterModule.forChild(routes),
    CommonModule,
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    DragDropModule,
    FlatpickrModule.forRoot(),
    HttpClientModule,
    FeatherModule
  ],
  providers:[
    DatePipe
  ]
}) 
export class SysModule { }
 

 