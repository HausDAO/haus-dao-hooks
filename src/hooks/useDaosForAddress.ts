import { GraphQLClient } from "graphql-request";

import { useQuery } from "@tanstack/react-query";
import { LIST_ALL_DAOS_FOR_ADDRESS } from "../utils/queries";
import { DaoItem, MemberItem } from "../utils/types";
import { useContext } from "react";
import { DaoHooksContext } from "../DaoHooksContext";
import { getGraphUrl } from "../utils/endpoints";

export const useDaosForAddress = ({
  chainid,
  address,
}: {
  chainid?: string;
  address?: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useDaos: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const yeeterUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(yeeterUrl);

  type DaosWithMembers = DaoItem &
    {
      members: MemberItem[];
    }[];

  const { data, ...rest } = useQuery({
    queryKey: [`get-daos-address-${chainid}-${address}`, { chainid, address }],
    enabled: Boolean(chainid && address),
    queryFn: (): Promise<{
      daos: DaosWithMembers;
    }> => graphQLClient.request(LIST_ALL_DAOS_FOR_ADDRESS, { address }),
  });

  return {
    daos: data?.daos,
    ...rest,
  };
};
