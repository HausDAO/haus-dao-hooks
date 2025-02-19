import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { LIST_RECORDS } from "../utils/queries";
import {
  RecordItem,
  SubgraphQueryOrderPaginationOptions,
} from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useDaoListRecords = ({
  chainid,
  daoid,
  queryOptions,
  table,
}: {
  chainid?: string;
  daoid?: string;
  table: string;
  queryOptions?: SubgraphQueryOrderPaginationOptions;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useDaoListRecords: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [
      `list-records-${chainid}-${daoid}-${table}`,
      { chainid, daoid, table },
    ],
    enabled: Boolean(chainid && daoid),
    queryFn: async (): Promise<{
      records: RecordItem[];
    }> => {
      const res = (await graphQLClient.request(LIST_RECORDS, {
        first: queryOptions?.first || 100,
        skip: queryOptions?.skip || 0,
        orderBy: queryOptions?.orderBy || "createdAt",
        orderDirection: queryOptions?.orderDirection || "desc",
        daoid,
        table,
      })) as {
        records: RecordItem[];
      };

      return {
        records: res.records,
      };
    },
  });

  return {
    records: data?.records,
    ...rest,
  };
};
