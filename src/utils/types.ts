export type YeeterItem = {
  id: string;
  createdAt: string;
  dao: {
    id: string;
  };
  endTime: string;
  startTime: string;
  isShares: boolean;
  multiplier: string;
  minTribute: string;
  goal: string;
  balance: string;
  yeetCount: string;
  isActive: boolean;
  isEnded: boolean;
  isComingSoon: boolean;
  isFull: boolean;
};

export type RecordItem = {
  createdAt: string;
  createdBy: string;
  content: string;
  contentType: string;
  dao: {
    name: string;
  };
};

export type YeeterMetadata = {
  daoId: string;
  icon?: string;
  links?: string[];
  missionStatement?: string;
  projectDetails?: string;
  name?: string;
};

export type YeetsItem = {
  amount: string;
  contributor: string;
  createdAt: string;
  id: string;
  message: string;
  shares: string;
};

export type ShamanItem = {
  id: string;
  createdAt: string;
  shamanAddress: string;
  permissions: string;
};

export type VaultItem = {
  id: string;
  createdAt: string;
  active: string;
  ragequittable: string;
  name: string;
  safeAddress: string;
};

export type DaoItem = {
  id: string;
  createdAt: string;
  createdBy: string;
  txHash: string;
  safeAddress: string;
  lootPaused: string;
  sharesPaused: string;
  gracePeriod: string;
  votingPeriod: string;
  proposalOffering: string;
  quorumPercent: string;
  sponsorThreshold: string;
  minRetentionPercent: string;
  shareTokenName: string;
  shareTokenSymbol: string;
  sharesAddress: string;
  lootTokenName: string;
  lootTokenSymbol: string;
  lootAddress: string;
  totalShares: string;
  totalLoot: string;
  latestSponsoredProposalId: string;
  proposalCount: string;
  activeMemberCount: string;
  existingSafe: string;
  delegatedVaultManager: string;
  forwarder: string;
  referrer: string;
  name: string;
  rawProfile: RecordItem[];
  profile?: DaoProfile;
  shamen: ShamanItem[];
  vaults: VaultItem[];
};

export type DaoProfileLink = {
  label?: string;
  url?: string;
};
export type DaoProfile = {
  description?: string;
  longDescription?: string;
  avatarImg?: string;
  tags?: string[];
  links?: DaoProfileLink[];
};
