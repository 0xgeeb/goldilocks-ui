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

export type GoldiswapTx = {
  __typename?: 'GoldiswapTx';
  fsl: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  psl: Scalars['BigInt']['output'];
  supply: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  txType: Scalars['String']['output'];
};

export type GoldiswapTxFilter = {
  AND?: InputMaybe<Array<InputMaybe<GoldiswapTxFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GoldiswapTxFilter>>>;
  fsl?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  fsl_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_not?: InputMaybe<Scalars['BigInt']['input']>;
  fsl_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  psl?: InputMaybe<Scalars['BigInt']['input']>;
  psl_gt?: InputMaybe<Scalars['BigInt']['input']>;
  psl_gte?: InputMaybe<Scalars['BigInt']['input']>;
  psl_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  psl_lt?: InputMaybe<Scalars['BigInt']['input']>;
  psl_lte?: InputMaybe<Scalars['BigInt']['input']>;
  psl_not?: InputMaybe<Scalars['BigInt']['input']>;
  psl_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  supply?: InputMaybe<Scalars['BigInt']['input']>;
  supply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  supply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supply_not?: InputMaybe<Scalars['BigInt']['input']>;
  supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  txType?: InputMaybe<Scalars['String']['input']>;
  txType_contains?: InputMaybe<Scalars['String']['input']>;
  txType_ends_with?: InputMaybe<Scalars['String']['input']>;
  txType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txType_not?: InputMaybe<Scalars['String']['input']>;
  txType_not_contains?: InputMaybe<Scalars['String']['input']>;
  txType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txType_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type GoldiswapTxPage = {
  __typename?: 'GoldiswapTxPage';
  items: Array<GoldiswapTx>;
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
  goldiswapTx?: Maybe<GoldiswapTx>;
  goldiswapTxes: GoldiswapTxPage;
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


export type QueryGoldiswapTxArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGoldiswapTxesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoldiswapTxFilter>;
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

export type GoldilendNfTsOwnedQueryVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type GoldilendNfTsOwnedQuery = { __typename?: 'Query', bondBeras: { __typename?: 'BondBeraPage', items: Array<{ __typename?: 'BondBera', id: any, owner: string }> }, bandBeras: { __typename?: 'BandBeraPage', items: Array<{ __typename?: 'BandBera', id: any, owner: string }> }, beradromes: { __typename?: 'BeradromePage', items: Array<{ __typename?: 'Beradrome', id: any, owner: string }> }, honeycombs: { __typename?: 'HoneycombPage', items: Array<{ __typename?: 'Honeycomb', id: any, owner: string }> } };

export type GetDailyEndPricesQueryVariables = Exact<{
  firstStart?: InputMaybe<Scalars['BigInt']['input']>;
  firstEnd?: InputMaybe<Scalars['BigInt']['input']>;
  secondStart?: InputMaybe<Scalars['BigInt']['input']>;
  secondEnd?: InputMaybe<Scalars['BigInt']['input']>;
  thirdStart?: InputMaybe<Scalars['BigInt']['input']>;
  thirdEnd?: InputMaybe<Scalars['BigInt']['input']>;
  fourthStart?: InputMaybe<Scalars['BigInt']['input']>;
  fourthEnd?: InputMaybe<Scalars['BigInt']['input']>;
  fifthStart?: InputMaybe<Scalars['BigInt']['input']>;
  fifthEnd?: InputMaybe<Scalars['BigInt']['input']>;
  sixthStart?: InputMaybe<Scalars['BigInt']['input']>;
  sixthEnd?: InputMaybe<Scalars['BigInt']['input']>;
  seventhStart?: InputMaybe<Scalars['BigInt']['input']>;
  seventhEnd?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetDailyEndPricesQuery = { __typename?: 'Query', firstDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, secondDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, thirdDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, fourthDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, fifthDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, sixthDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> }, seventhDay: { __typename?: 'GoldiswapTxPage', items: Array<{ __typename?: 'GoldiswapTx', txType: string, fsl: any, psl: any, supply: any, timestamp: any }> } };


export const GoldilendNfTsOwnedDocument = gql`
    query GoldilendNFTsOwned($owner: String!) {
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
 * __useGoldilendNfTsOwnedQuery__
 *
 * To run a query within a React component, call `useGoldilendNfTsOwnedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoldilendNfTsOwnedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoldilendNfTsOwnedQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useGoldilendNfTsOwnedQuery(baseOptions: Apollo.QueryHookOptions<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables> & ({ variables: GoldilendNfTsOwnedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>(GoldilendNfTsOwnedDocument, options);
      }
export function useGoldilendNfTsOwnedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>(GoldilendNfTsOwnedDocument, options);
        }
export function useGoldilendNfTsOwnedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>(GoldilendNfTsOwnedDocument, options);
        }
export type GoldilendNfTsOwnedQueryHookResult = ReturnType<typeof useGoldilendNfTsOwnedQuery>;
export type GoldilendNfTsOwnedLazyQueryHookResult = ReturnType<typeof useGoldilendNfTsOwnedLazyQuery>;
export type GoldilendNfTsOwnedSuspenseQueryHookResult = ReturnType<typeof useGoldilendNfTsOwnedSuspenseQuery>;
export type GoldilendNfTsOwnedQueryResult = Apollo.QueryResult<GoldilendNfTsOwnedQuery, GoldilendNfTsOwnedQueryVariables>;
export const GetDailyEndPricesDocument = gql`
    query GetDailyEndPrices($firstStart: BigInt, $firstEnd: BigInt, $secondStart: BigInt, $secondEnd: BigInt, $thirdStart: BigInt, $thirdEnd: BigInt, $fourthStart: BigInt, $fourthEnd: BigInt, $fifthStart: BigInt, $fifthEnd: BigInt, $sixthStart: BigInt, $sixthEnd: BigInt, $seventhStart: BigInt, $seventhEnd: BigInt) {
  firstDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $firstStart}, {timestamp_lt: $firstEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  secondDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $secondStart}, {timestamp_lt: $secondEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  thirdDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $thirdStart}, {timestamp_lt: $thirdEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  fourthDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $fourthStart}, {timestamp_lt: $fourthEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  fifthDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $fifthStart}, {timestamp_lt: $fifthEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  sixthDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $sixthStart}, {timestamp_lt: $sixthEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
  seventhDay: goldiswapTxes(
    where: {AND: [{timestamp_gte: $seventhStart}, {timestamp_lt: $seventhEnd}]}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 1
  ) {
    items {
      txType
      fsl
      psl
      supply
      timestamp
    }
  }
}
    `;

/**
 * __useGetDailyEndPricesQuery__
 *
 * To run a query within a React component, call `useGetDailyEndPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyEndPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyEndPricesQuery({
 *   variables: {
 *      firstStart: // value for 'firstStart'
 *      firstEnd: // value for 'firstEnd'
 *      secondStart: // value for 'secondStart'
 *      secondEnd: // value for 'secondEnd'
 *      thirdStart: // value for 'thirdStart'
 *      thirdEnd: // value for 'thirdEnd'
 *      fourthStart: // value for 'fourthStart'
 *      fourthEnd: // value for 'fourthEnd'
 *      fifthStart: // value for 'fifthStart'
 *      fifthEnd: // value for 'fifthEnd'
 *      sixthStart: // value for 'sixthStart'
 *      sixthEnd: // value for 'sixthEnd'
 *      seventhStart: // value for 'seventhStart'
 *      seventhEnd: // value for 'seventhEnd'
 *   },
 * });
 */
export function useGetDailyEndPricesQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>(GetDailyEndPricesDocument, options);
      }
export function useGetDailyEndPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>(GetDailyEndPricesDocument, options);
        }
export function useGetDailyEndPricesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>(GetDailyEndPricesDocument, options);
        }
export type GetDailyEndPricesQueryHookResult = ReturnType<typeof useGetDailyEndPricesQuery>;
export type GetDailyEndPricesLazyQueryHookResult = ReturnType<typeof useGetDailyEndPricesLazyQuery>;
export type GetDailyEndPricesSuspenseQueryHookResult = ReturnType<typeof useGetDailyEndPricesSuspenseQuery>;
export type GetDailyEndPricesQueryResult = Apollo.QueryResult<GetDailyEndPricesQuery, GetDailyEndPricesQueryVariables>;