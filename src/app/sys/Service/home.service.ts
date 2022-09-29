import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apollo: ApolloBase;
  private result: any
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Reception');
  }


  public getData(): any {

    return this.apollo
      .watchQuery({
        query: gql`
            {
              GetVisitors{
                id
                fullname
              }
            }
        `,
      }).valueChanges.pipe(
        map((result: any) => (result?.data)),
        map(data => data?.GetVisitors)
      )
  }
}