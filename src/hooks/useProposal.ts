import { GraphQLClient } from "graphql-request";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { FIND_PROPOSAL } from "../utils/queries";
import { ProposalItem } from "../utils/types";
import { getGraphUrl } from "../utils/endpoints";
import { DaoHooksContext } from "../DaoHooksContext";

export const useProposal = ({
  chainid,
  proposalid,
  daoid,
}: {
  chainid: string;
  proposalid: string;
  daoid: string;
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
    queryKey: [
      `get-proposal-${chainid}-${daoid}-${proposalid}`,
      { chainid, daoid, proposalid },
    ],
    queryFn: async (): Promise<{
      proposal: ProposalItem;
    }> => {
      const res = (await graphQLClient.request(FIND_PROPOSAL, {
        proposalid: `${daoid.toLowerCase()}-proposal-${proposalid}`,
      })) as {
        proposal: ProposalItem;
      };

      return {
        proposal: res.proposal,
      };
    },
  });

  return {
    proposal: data?.proposal,
    ...rest,
  };
};
