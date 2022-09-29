import { Injectable } from '@angular/core'; 
import { Visitor_Logs } from '../tracking/visitorlogs';

import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Door } from '../door/door';
import { Gender } from '../gender/gender';
import { Profile } from '../profile/profile';



@Injectable({
  providedIn: 'root'
})
export class ReportService {

private apollo: ApolloBase;
  private result: any
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  } 
  public getProfiles(): Observable<Profile> {
    return this.apollo
      .watchQuery({
        query: gql`
           {
              GetProfiles {
                id
                bio
              }
            }

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetProfiles)
      )
  }
 
  public getLogsVisitorsPeriod(sDate: Date, eDate: Date): Observable<Visitor_Logs> {
    console.log(sDate)
    console.log(eDate)


    let Q = `{
    GetLogsVisitors(data: {sDate: "${sDate.toISOString()}", eDate: "${eDate.toISOString()}"}) {
      id
      day
      mainDoorIn
      mainDoorOut
      subDoorIn
      subDoorOut
      door {
        id
        name
      }
      Visitor {
        id
        Profile {
          id
          bio
        }
        Gender {
          id
          name
        }
        fullname
        email
        Event {
          id
          name
          fromDate
          toDate
        }
        Door {
          id
          name
        }
      }
    }
  }
`
console.log(Q);



    return this.apollo
      .watchQuery({
        query: gql`${Q}`,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetLogsVisitors)
      )
  }
}
