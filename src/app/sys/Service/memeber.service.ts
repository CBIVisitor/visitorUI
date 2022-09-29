import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

import { from, Observable } from 'rxjs';

import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MemeberService {

  constructor() { }
}
