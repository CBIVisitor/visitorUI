import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Person } from '../../sys/person/Person';
@Injectable({
  providedIn: 'root'
})




export class AuthService {
  currentUser = {};

  UserRole: String[] = []

  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo, public router: Router) {
    this.apollo = this.apolloProvider.use('Reception');
  }
  public getSignIn(user: Person): Observable<Person> {

    return this.apollo
      .watchQuery({
        query: gql`
          {
            PersonSignIn(data: {id: 0, username:"${user.username}", password:"${user.password}"}) {
              id
              username
              password
               roleForPerson{  
                role {
                  name
                }
              }
            }
          }


        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.PersonSignIn),
      )
  }
  signIn(user: Person) {
    console.log("This Ahmed -------------------")
    console.log(user)


    this.getSignIn(user).subscribe((data: any) => {
      user = data;
      console.log(data)
      localStorage.setItem('access_token', data.password);
      localStorage.setItem('username', data.username);
      var roles = data.roleForPerson.map((o: { role: { name: any; }; }) => o.role.name);
      this.UserRole = roles

      localStorage.setItem("user_roles", JSON.stringify(roles)); //store colors


      console.log(roles)
      this.currentUser = data;
      console.log("----------------------------------------------------------------------------")
     // console.log(this.currentUser)
      this.router.navigate(['/sys/Home']);
    });
  }


  public getRols() {
    return JSON.parse(localStorage.getItem("user_roles") || '') || [];
  }
  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.router.navigate(['auth']);
  }
  Islogin() {
    if (localStorage.getItem('username')) {
      return true
    } else {
      return false
    }
  }
  GetUsername() {
    return localStorage.getItem('username') || ''
  }
}
