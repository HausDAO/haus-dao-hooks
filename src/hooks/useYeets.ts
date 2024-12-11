import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { LIST_YEETS } from "../utils/queries";
import { YeetsItem } from "../utils/types";
import { useContext } from "react";
import { DaoHooksContext } from "../DaoHooksContext";
import { getGraphUrl } from "../utils/endpoints";

export const useYeets = ({
  chainid,
  yeeterid,
}: {
  chainid: string;
  yeeterid: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    throw new Error("DaoHooksContext must be used within a DaoHooksProvider");
  }

  const yeeterUrl = getGraphUrl({
    chainid,
    graphKey: hookContext.config.graphKey,
    subgraphKey: "YEETER",
  });

  const graphQLClient = new GraphQLClient(yeeterUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`list-yeets-${yeeterid}`, { yeeterid }],
    queryFn: (): Promise<{
      yeets: YeetsItem[];
    }> => graphQLClient.request(LIST_YEETS, { shamanAddress: yeeterid }),
  });

  return {
    yeets: data?.yeets,
    ...rest,
  };
};
