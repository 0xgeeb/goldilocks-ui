import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
};

export type BandBera = {
  __typename?: 'BandBera';
  id: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
};

export type BandBeraFilter = {
  AND?: InputMaybe<Array<InputMaybe<BandBeraFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BandBeraFilter>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BandBeraPage = {
  __typename?: 'BandBeraPage';
  items: Array<BandBera>;
  pageInfo: PageInfo;
};

export type Beradrome = {
  __typename?: 'Beradrome';
  id: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
};

export type BeradromeFilter = {
  AND?: InputMaybe<Array<InputMaybe<BeradromeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BeradromeFilter>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BeradromePage = {
  __typename?: 'BeradromePage';
  items: Array<Beradrome>;
  pageInfo: PageInfo;
};

export type BondBera = {
  __typename?: 'BondBera';
  id: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
};

export type BondBeraFilter = {
  AND?: InputMaybe<Array<InputMaybe<BondBeraFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BondBeraFilter>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BondBeraPage = {
  __typename?: 'BondBeraPage';
  items: Array<BondBera>;
  pageInfo: PageInfo;
};

export type Honeycomb = {
  __typename?: 'Honeycomb';
  id: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
};

export type HoneycombFilter = {
  AND?: InputMaybe<Array<InputMaybe<HoneycombFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HoneycombFilter>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HoneycombPage = {
  __typename?: 'HoneycombPage';
  items: Array<Honeycomb>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  bandBera?: Maybe<BandBera>;
  bandBeras: BandBeraPage;
  beradrome?: Maybe<Beradrome>;
  beradromes: BeradromePage;
  bondBera?: Maybe<BondBera>;
  bondBeras: BondBeraPage;
  honeycomb?: Maybe<Honeycomb>;
  honeycombs: HoneycombPage;
};


export type QueryBandBeraArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBandBerasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BandBeraFilter>;
};


export type QueryBeradromeArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBeradromesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BeradromeFilter>;
};


export type QueryBondBeraArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBondBerasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BondBeraFilter>;
};


export type QueryHoneycombArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHoneycombsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HoneycombFilter>;
};

export type BerasOwnedQueryVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type BerasOwnedQuery = { __typename?: 'Query', bondBeras: { __typename?: 'BondBeraPage', items: Array<{ __typename?: 'BondBera', id: any, owner: string }> }, bandBeras: { __typename?: 'BandBeraPage', items: Array<{ __typename?: 'BandBera', id: any, owner: string }> } };

export type PartnerNfTsOwnedQueryVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type PartnerNfTsOwnedQuery = { __typename?: 'Query', beradromes: { __typename?: 'BeradromePage', items: Array<{ __typename?: 'Beradrome', id: any, owner: string }> }, honeycombs: { __typename?: 'HoneycombPage', items: Array<{ __typename?: 'Honeycomb', id: any, owner: string }> } };


export const BerasOwnedDocument = gql`
    query BerasOwned($owner: String!) {
  bondBeras(where: {owner: $owner}, orderDirection: "desc") {
    items {
      id
      owner
    }
  }
  bandBeras(where: {owner: $owner}, orderDirection: "desc") {
    items {
      id
      owner
    }
  }
}
    `;

/**
 * __useBerasOwnedQuery__
 *
 * To run a query within a React component, call `useBerasOwnedQuery` and pass it any options that fit your needs.
 * When your component renders, `useBerasOwnedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBerasOwnedQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useBerasOwnedQuery(baseOptions: Apollo.QueryHookOptions<BerasOwnedQuery, BerasOwnedQueryVariables> & ({ variables: BerasOwnedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BerasOwnedQuery, BerasOwnedQueryVariables>(BerasOwnedDocument, options);
      }
export function useBerasOwnedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BerasOwnedQuery, BerasOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BerasOwnedQuery, BerasOwnedQueryVariables>(BerasOwnedDocument, options);
        }
export function useBerasOwnedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BerasOwnedQuery, BerasOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BerasOwnedQuery, BerasOwnedQueryVariables>(BerasOwnedDocument, options);
        }
export type BerasOwnedQueryHookResult = ReturnType<typeof useBerasOwnedQuery>;
export type BerasOwnedLazyQueryHookResult = ReturnType<typeof useBerasOwnedLazyQuery>;
export type BerasOwnedSuspenseQueryHookResult = ReturnType<typeof useBerasOwnedSuspenseQuery>;
export type BerasOwnedQueryResult = Apollo.QueryResult<BerasOwnedQuery, BerasOwnedQueryVariables>;
export const PartnerNfTsOwnedDocument = gql`
    query PartnerNFTsOwned($owner: String!) {
  beradromes(where: {owner: $owner}, orderDirection: "desc") {
    items {
      id
      owner
    }
  }
  honeycombs(where: {owner: $owner}, orderDirection: "desc") {
    items {
      id
      owner
    }
  }
}
    `;

/**
 * __usePartnerNfTsOwnedQuery__
 *
 * To run a query within a React component, call `usePartnerNfTsOwnedQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerNfTsOwnedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerNfTsOwnedQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function usePartnerNfTsOwnedQuery(baseOptions: Apollo.QueryHookOptions<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables> & ({ variables: PartnerNfTsOwnedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>(PartnerNfTsOwnedDocument, options);
      }
export function usePartnerNfTsOwnedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>(PartnerNfTsOwnedDocument, options);
        }
export function usePartnerNfTsOwnedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>(PartnerNfTsOwnedDocument, options);
        }
export type PartnerNfTsOwnedQueryHookResult = ReturnType<typeof usePartnerNfTsOwnedQuery>;
export type PartnerNfTsOwnedLazyQueryHookResult = ReturnType<typeof usePartnerNfTsOwnedLazyQuery>;
export type PartnerNfTsOwnedSuspenseQueryHookResult = ReturnType<typeof usePartnerNfTsOwnedSuspenseQuery>;
export type PartnerNfTsOwnedQueryResult = Apollo.QueryResult<PartnerNfTsOwnedQuery, PartnerNfTsOwnedQueryVariables>;