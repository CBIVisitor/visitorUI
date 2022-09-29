import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, NamedOptions } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';


//const serverNode = "localhost";
const serverNode = "visitor.cbi.lan";

const uri = `http://${serverNode}:7000/graphql`; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          Reception: {
            // <-- this settings will be saved by name: newClientName
            cache: new InMemoryCache({ addTypename: false, resultCaching : false}),
            link: httpLink.create({
              uri: uri,
            }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
