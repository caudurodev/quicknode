import * as Types from "./graphql";

import * as Operations from "./graphql";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { QueryHookOptions, useQuery } from "@apollo/client";
import * as Apollo from "@apollo/client";
import type React from "react";
import { getApolloClient, ApolloClientContext } from "../../libs/withApollo";

export async function getServerPageGetTrendingCollections(
  options: Omit<
    Apollo.QueryOptions<Types.GetTrendingCollectionsQueryVariables>,
    "query"
  >,
  ctx: ApolloClientContext
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetTrendingCollectionsQuery>({
    ...options,
    query: Operations.GetTrendingCollectionsDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetTrendingCollections = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetTrendingCollectionsQuery,
    Types.GetTrendingCollectionsQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetTrendingCollectionsDocument, options);
};
export type PageGetTrendingCollectionsComp = React.FC<{
  data?: Types.GetTrendingCollectionsQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetTrendingCollections =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetTrendingCollectionsQuery,
      Types.GetTrendingCollectionsQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetTrendingCollectionsComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetTrendingCollectionsDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetTrendingCollections = {
  getServerPage: getServerPageGetTrendingCollections,
  withPage: withPageGetTrendingCollections,
  usePage: useGetTrendingCollections,
};
