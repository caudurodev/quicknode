import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component />
      </ApolloProvider>
    );
  };
};

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const httpLink = new HttpLink({ uri: "https://graphql.icy.tools/graphql" });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        "x-api-key": process.env.ICY_API_KEY || "",
      },
    }));
    return forward(operation);
  });
  const cache = new InMemoryCache().restore(ssrCache ?? {});
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
  });
}
