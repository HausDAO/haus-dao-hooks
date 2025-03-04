import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { LIST_ALL_EXITS_FOR_ADDRESS } from "../utils/queries";
import { ExitItem, SubgraphQueryOrderPaginationOptions } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useDaoExitsForAddress = ({
  chainid,
  address,
  queryOptions,
}: {
  chainid?: string;
  address?: string;
  queryOptions?: SubgraphQueryOrderPaginationOptions;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useDaoExitsForAddress: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`list-exits-address`, { chainid, address }],
    enabled: Boolean(chainid && address),
    queryFn: async (): Promise<{
      exits: ExitItem[];
    }> => {
      const res = (await graphQLClient.request(LIST_ALL_EXITS_FOR_ADDRESS, {
        first: queryOptions?.first || 100,
        skip: queryOptions?.skip || 0,
        orderBy: queryOptions?.orderBy || "createdAt",
        orderDirection: queryOptions?.orderDirection || "desc",
        memberAddress: address?.toLowerCase(),
      })) as {
        rageQuits: ExitItem[];
      };

      return {
        exits: res.rageQuits,
      };
    },
  });

  return {
    exits: data?.exits,
    ...rest,
  };
};
