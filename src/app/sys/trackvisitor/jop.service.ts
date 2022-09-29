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
export class JopService {
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
    this.apollo.client.resetStore();
    console.log(this.Q)
    console.log("Visitor_Logs   >>")
    return this.apollo
      .watchQuery({
        query: gql`${this.Q}`,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetTodayVisitors)
      )
  }



  public getDoors(): Observable<Door> {
    return this.apollo
      .watchQuery({
        query: gql`
            {
              GetDoors {
                id
                name
              }
            }

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetDoors)
      )
  }


  public setSubDoorIn(id: number): Observable<Date> {
    console.log(id)

    let UpdateSubDoor = ` 
                          mutation{
                            setSubDoorIn(data:${id})
                          } 
                      `
    console.log(UpdateSubDoor)
    const Update_SubDoor = gql` ${UpdateSubDoor}  `;
    console.log(Update_SubDoor)
    return this.apollo.mutate({
      mutation: Update_SubDoor
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.setSubDoorIn)
    )

  }
  public setMainDoorIn(id: number): Observable<Date> {
    console.log(id)

    let UpdateMainDoor = ` 
                          mutation{
                            setMainDoorIn(data:${id})
                          } 
                      `
    console.log(UpdateMainDoor)
    const Update_MainDoor = gql` ${UpdateMainDoor}`;
    return this.apollo.mutate({
      mutation: Update_MainDoor
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.setMainDoorIn)
    )


  }
  public setMainDoorOut(id: number): Observable<Date> {
    console.log(id)

    let UpdateMainDoor = ` 
                          mutation{
                            setMainDoorOut(data:${id})
                          } 
                      `
    console.log(UpdateMainDoor)
    const Update_MainDoor = gql` ${UpdateMainDoor}`;
    return this.apollo.mutate({
      mutation: Update_MainDoor
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.setMainDoorOut)
    )

  }
  public setSubDoorOut(id: number): Observable<Date> {
    console.log(id)

    let UpdateSubDoor = ` 
                          mutation{
                            setSubDoorOut(data:${id})
                          } 
                      `
    console.log(UpdateSubDoor)
    const Update_SubDoor = gql` ${UpdateSubDoor}  `;
    console.log(Update_SubDoor)
    return this.apollo.mutate({
      mutation: Update_SubDoor
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.setSubDoorOut)
    )

  }
}


