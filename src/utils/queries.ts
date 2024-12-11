import { gql } from "graphql-request";

const yeeterFields = `
id
createdAt
dao {
  id
}
endTime
startTime
isShares
multiplier
minTribute
goal
balance
yeetCount
`;

export const GET_YEETER = gql`
  query yeeter($shamanAddress: String!) {
    yeeter(id: $shamanAddress) {
      ${yeeterFields}
    }
  }
`;

export const GET_ALL_YEETERS = gql`
  {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
    ) {
      ${yeeterFields}

    }
  }
`;

export const GET_OPEN_YEETERS = gql`
  query yeeters($now: String!) {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
      where: { endTime_gte: $now }
    ) {
      ${yeeterFields}

    }
  }
`;

export const GET_CLOSED_YEETERS = gql`
  query yeeters($now: String!) {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc,
      where: { endTime_lte: $now }
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_YEETS = gql`
  query yeets($shamanAddress: String!) {
    yeets(
      where: { yeeter: $shamanAddress }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
    }
  }
`;

export const GET_YEETS_BY_TX = gql`
  query yeets($txHash: String!) {
    yeets(where: { txHash: $txHash }, first: 1) {
      id
      txHash
      shares
    }
  }
`;

export const GET_YEETER_PROFILE = gql`
  query record($daoid: String!) {
    records(
      where: { dao: $daoid, table: "yeetDetails" }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      createdAt
      createdBy
      tag
      table
      contentType
      content
      queryType
      dao {
        id
        name
      }
    }
    dao(id: $daoid) {
      id
      name
    }
  }
`;
