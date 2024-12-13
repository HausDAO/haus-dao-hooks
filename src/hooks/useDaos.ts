import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { LIST_ALL_DAOS } from "../utils/queries";
import {
  DaoItem,
  DaoProfile,
  SubgraphQueryOrderPaginationOptions,
} from "../utils/types";
import { addParsedContent } from "../utils/yeeter-data-helpers";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useDaos = ({
  chainid,
  queryOptions,
}: {
  chainid: string;
  queryOptions?: SubgraphQueryOrderPaginationOptions;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
  }

  const dhUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`list-daos-${chainid}`, { chainid }],
    queryFn: async (): Promise<{
      daos: DaoItem[];
    }> => {
      const daores = (await graphQLClient.request(LIST_ALL_DAOS, {
        first: queryOptions?.first || 100,
        skip: queryOptions?.skip || 0,
        orderBy: queryOptions?.orderBy || "createdAt",
        orderDirection: queryOptions?.orderDirection || "desc",
      })) as {
        daos: DaoItem[];
      };

      const hydratedDaos = daores.daos.map((dao) => {
        return {
          ...dao,
          profile: addParsedContent<DaoProfile>(dao.rawProfile[0]),
        };
      });

      return {
        daos: hydratedDaos,
      };
    },
  });

  return {
    daos: data?.daos,
    ...rest,
  };
};
