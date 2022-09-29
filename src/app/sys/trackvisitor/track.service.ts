import { Injectable } from '@angular/core'; 
import { Visitor_Logs } from './visitorlogs';

import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Door } from '../door/door';
import { Gender } from '../gender/gender';
import { Profile } from '../profile/profile';
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private apollo: ApolloBase;
  private result: any
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  }

  Q: string = `{
  GetTodayVisitors {
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



  public getLogsVisitors(): Observable<Visitor_Logs> {
   // this.apollo.client.resetStore();
    console.log(this.Q)
    console.log("Visitor_Logs   >>")
    return this.apollo
      .watchQuery({query: gql`${this.Q}`}).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetTodayVisitors)
      )
  }



   

  
}


