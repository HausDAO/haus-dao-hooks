import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { FIND_MEMBER } from "../utils/queries";
import { MemberItem } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useMember = ({
  chainid,
  memberaddress,
  daoid,
}: {
  chainid?: string;
  memberaddress?: string;
  daoid?: string;
}) => {
  const hookContext = useContext(DaoHooksContext);

  if (!hookContext || !hookContext.config.graphKey) {
    console.error(
      "useMember: DaoHooksContext must be used within a DaoHooksProvider"
    );
  }

  const dhUrl = getGraphUrl({
    chainid: chainid || "",
    graphKey: hookContext?.config.graphKey || "",
    subgraphKey: "DAOHAUS",
  });

  const graphQLClient = new GraphQLClient(dhUrl);

  const { data, ...rest } = useQuery({
    queryKey: [`get-member`, { chainid, daoid, memberaddress }],
    enabled: Boolean(chainid && memberaddress && daoid),
    queryFn: async (): Promise<{
      member: MemberItem;
    }> => {
      const res = (await graphQLClient.request(FIND_MEMBER, {
        memberid: `${daoid?.toLowerCase()}-member-${memberaddress?.toLowerCase()}`,
      })) as {
        member: MemberItem;
      };

      return {
        member: res.member,
      };
    },
  });

  return {
    member: data?.member,
    ...rest,
  };
};
