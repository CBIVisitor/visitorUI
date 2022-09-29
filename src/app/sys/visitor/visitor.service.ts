
import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Bank } from '../bank/bank';
import { Department } from '../department/department';
import { Directorate } from '../directorate/directorate';
import { Door } from '../door/door';
import { Gender } from '../gender/gender';
import { Ministry } from '../ministry/Ministry';
import { Profile } from '../profile/profile';
import { Visitor } from './visitor';
@Injectable({
  providedIn: 'root'
})

export class VisitorService {
 

  private apollo: ApolloBase;
  private result: any
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  }
  private visitors: Visitor[] = [];
  private genders: Gender[] = [];
  private profiles: Profile[] = [];

  // getvisitors(): Observable<visitor> {
  // You can also fetch data from Api using HttpClient.
  //   return this.http.get(url..)
  // }
  getvisitors(): Observable<Visitor> {
    console.log(this.visitors)
    return from(this.visitors);
  }

  public deletevisitor(id: number): any {
    console.log(id)
    this.visitors = this.visitors.filter(visitor => visitor.id !== id);
    let deletevisitor = ` 
                      mutation{
                          deleteVisitor(data:${id}){ 
                                id
                                fullname
                                mobile
                                fromDate
                                destination 
                                Profile{
                                    id
                                    bio
                                  }
                              }
                            }
                      `
    console.log(deletevisitor)      
    const DELETE_VISITOR = gql` ${deletevisitor}  `;
    console.log(DELETE_VISITOR)
    return this.apollo.mutate({
      mutation: DELETE_VISITOR
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.deleteVisitor)
    )
    
  }

  public addvisitor(visitor: Visitor): any {
    console.log(visitor)

    this.visitors?.push(visitor); 
    let Create_Visitor = `
      mutation{
        createVisitor(data:{
          id:0,
          fullname:"${visitor.fullname}", 
          Author:1,
          email:"${visitor.email}",
          job_description:"${visitor.job_description}",
          destination:"${visitor.destination}",
          mobile:"${visitor.mobile}",
          Gender:${visitor.Gender?.id},
          Profile:${visitor.Profile?.id},
          Event:${visitor.Event?.id},
          Department:${visitor.Department?.id},
          Directorate:${visitor.Directorate?.id}, 
          Door:${visitor.Door?.id},
          Ministry:${visitor.Ministry?.id},
          Bank:${visitor.Bank?.id},
          h_Name:"${visitor.h_Name}",
          h_Directorate:"${visitor.h_Directorate}"
          h_Department:"${visitor.h_Department}",
          note:"${visitor.note}",
          fromDate:"${visitor.fromDate?.toISOString()}",
          toDate:"${visitor.toDate?.toISOString()}", 
        }){
          id
          fullname
          fromDate
          Profile{
            bio
          }
          h_Name
          Directorate{
            name
          }
          Department
          {
            name
          }
          Door{
            name
          }
          mobile
        }
}`
    console.log(Create_Visitor)
    const ADD_VISITOR = gql`   ${Create_Visitor}  `;
    return this.apollo.mutate({
      mutation: ADD_VISITOR
    }).pipe(
      map((result: any) => (result?.data)),
      map(data => data?.createVisitor)
    )



  }

  updatevisitor(index: number, visitor: Visitor): void {
    this.visitors[index] = visitor;
  }
  public getGenders(): Observable<Gender> {
    return this.apollo
      .watchQuery({
        query: gql`
            {
              GetGenders {
                id
                name
              }
            }

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetGenders)
      )
  }
  public getDoors(): Observable<Door> {
   // this.apollo.client.resetStore();
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
  public getEvents(): Observable<Profile> {
    //this.apollo.client.resetStore();
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


  public getMinistries(): Observable<Ministry> {
    return this.apollo
      .watchQuery({
        query: gql`
           {
               
              GetMinistrys {
                id
                name 
              }
            } 

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetMinistrys)
      )
  }
  public getBanks(): Observable<Bank> {
   // this.apollo.client.resetStore();
    return this.apollo
      .watchQuery({
        query: gql`
           {
               
              GetBanks {
                id
                name 
              }
            } 

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetBanks)
      )
  }

  public getDirectorates(): Observable<Directorate> {
    //this.apollo.client.resetStore();
    return this.apollo
      .watchQuery({
        query: gql`
           {
               
              GetDirectorates {
                id
                name 
              }
            } 

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetDirectorates)
      )
  }
  public getDepartments(): Observable<Department> {
    //this.apollo.client.resetStore();
    return this.apollo
      .watchQuery({
        query: gql`
           {
               
              GetDepartments {
                id
                name 
                directorateId
              }
            } 

        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetDepartments)
      )
  }

  public getvisitors2(): Observable<Visitor> {
    return this.apollo
      .watchQuery({
        query: gql`
            {
              GetVisitors{
                id
    fullname
    fromDate
    Gender{
      id
    }
    Profile{
      id
      bio
    }
    h_Name
    Directorate{
      name
    }
    Department
    {
      name
    }
    Door{
      name
    }
    mobile
  }
}
        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetVisitors)
      )  
  }


  public getData(): any {

    return this.apollo
      .watchQuery({
        query: gql`
            {
              GetVisitors{
                id
                fullname
                job_description
                ge
                destination
                mobile
              }
            }
        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetVisitors)
      )
  }
}