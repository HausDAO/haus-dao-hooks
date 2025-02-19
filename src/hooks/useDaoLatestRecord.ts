import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { LAST_RECORD } from "../utils/queries";
import { RecordItem } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useDaoLatestRecord = ({
  chainid,
  daoid,
  table,
}: {
  chainid?: string;
  daoid?: string;
  table: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useDaoLatestRecord: DaoHooksContext must be used within a DaoHooksProvider"
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
      record: RecordItem;
    }> => {
      const res = (await graphQLClient.request(LAST_RECORD, {
        daoid,
        table,
      })) as {
        records: RecordItem[];
      };

      return {
        record: res.records[0],
      };
    },
  });

  return {
    record: data?.record,
    ...rest,
  };
};
