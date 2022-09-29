
import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  }


  public getEvents(): Observable<Event> {
    return this.apollo
      .watchQuery({
        query: gql`
           {
               
              GetEvents {
                id
                name
                fromDate
                toDate
              }
            } 

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetEvents)
      )
  }




  public AddEvent(Event: any): Observable<Event> {

    console.log("Event--------------------")
    console.log(Event)

    const Create_Event = ` mutation{
                                          createEvent(data: {id: 0, name: "${Event.name}", 
                                                      fromDate: "${Event.fromDate.toISOString()}",
                                                      toDate: "${Event.toDate.toISOString()}"}) {
                                                      id
                                                      name
                                                      fromDate
                                                      toDate
                                                    }
                                        }
                                     `;
    console.log(Create_Event)
    return this.apollo.mutate({
      mutation: gql`${Create_Event}`
    }).pipe(
      map((result: any) => (result?.data)), 
      map(data => data?.createEvent)
    )
  }
  public DeleteEvent(id:number): Observable<Event> {

    console.log("id--------------------")
    console.log(id)

    const Delete_Event = ` 
                      mutation{
                          deleteEvent(data:${id}){
                            id 
                          }
                        }
                        `;
    console.log(Delete_Event)
    return this.apollo.mutate({
      mutation: gql`${Delete_Event}`
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.deleteEvent)
    )
  }
}
