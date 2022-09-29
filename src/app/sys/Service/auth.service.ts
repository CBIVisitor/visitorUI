import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Person } from '../person/Person';
@Injectable({
  providedIn: 'root'
})




export class AuthService {
  currentUser = {};
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  }
  public getSignIn(): Observable<Person> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            PersonSignIn(data: {id: 0, username:"main", password:"123456"}) {
              id
              username
              password
            }
          }


        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.PersonSignIn)
      )
  }

  signIn(user: Person) {


    this.getSignIn().subscribe((data: any) => {
      user = data;
      console.log(data)
     // localStorage.setItem('access_token', res.token);
      this.currentUser = data;
      //this.router.navigate(['user-profile/' + res.msg._id]);

    }); 
     
  }

}
