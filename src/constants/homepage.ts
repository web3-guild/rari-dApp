// Logos
import FuseLogo from "static/fuseicon.png";
import { FusePoolMetric } from "utils/fetchFusePoolData";
import { Pool } from "utils/poolUtils";

/* traditional rari Fuse Pools (to be removed after MVP version)  */
export interface HomepageFusePool {
  id: number;
  title?: string;
  subtitle?: string;
}
export interface NFTPools {
  category: string;
  title?: string;
  subtitle?: string;
  marketplace: string;
  metadata?: string[];

}
export const HOMEPAGE_NFT_POOLS: NFTPools[] = [
{ category: "Scientific NFT's",
  marketplace: "rarible protocol"
},
{ category: "artistic NFT's",
  marketplace: "Zora protocol",
}
// and so on , get the specs specified  and  then implement  the corresponding helper functions for display.


]

// TODO: remove the reference 
export const HOMEPAGE_FUSE_POOLS: HomepageFusePool[] = [
  {
    id: 1,
    // title: "Pool 1",
    // subtitle: "Pool 1",
  },
  {
    id: 2,
    // title: "Pool 2",
    // subtitle: "Pool 2",
  },

  {
    id: 4,
    // title: "Pool 4",
    // subtitle: "Pool 4",
  },
  {
    id: 5,
    // title: "Pool 5",
    // subtitle: "Pool 5",
  },
  {
    id: 1,
    // title: "Pool 1",
    // subtitle: "Pool 1",
  },
  {
    id: 2,
    // title: "Pool 2",
    // subtitle: "Pool 2",
  },

  {
    id: 4,
    // title: "Pool 4",
    // subtitle: "Pool 4",
  },
  {
    id: 5,
    // title: "Pool 5",
    // subtitle: "Pool 5",
  },
];

/* Opportunities */
export enum HomepageOpportunityType {
  EarnVault,
  FusePool,
  EarnPage,
  FusePage,
  Pool2Page,
  TranchesPage,
}
// @credits to 💐 for the NFTFinancialization talk , lets get the 101 implemented 

export enum NFTFinancializationOppertunityType {
DeFIPositionTokenization,
LegalPositionTokenization,
ScientificProjectsTokenization,
Lending,
}

export interface NFTServices {
  type: NFTFinancializationOppertunityType;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  // Conditional params
  VaultType: NFTPools;
  PoolId?: number;
  vaultType?: Pool;
  fusePoolId?: number;
  fuseMetric?: FusePoolMetric;
}


// TODO: to be removed 
export interface HomepageOpportunity {
  type: HomepageOpportunityType;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  // Conditional params
  vaultType?: Pool;
  fusePoolId?: number;
  fuseMetric?: FusePoolMetric;
}



// TODO: to be removed 
export const HOMEPAGE_OPPORTUNIES: HomepageOpportunity[] = [
  {
    type: HomepageOpportunityType.EarnVault,
    title: "ETH Pool",
    subtitle: "Earn interest on ETH deposits",
    bgColor: "#A5A7ED",
    icon: FuseLogo,
    vaultType: Pool.ETH,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "DAI Pool",
    subtitle: "Earn interest on DAI deposits",
    bgColor: "#FFA700",
    icon: FuseLogo,
    vaultType: Pool.DAI,
  },
  {
    type: HomepageOpportunityType.FusePool,
    title: "Tetranode's Pool",
    subtitle: "Lend RGT and borrow against it",
    bgColor: "#00BB28",
    icon: FuseLogo,
    fusePoolId: 6,
    fuseMetric: FusePoolMetric.TotalSuppliedUSD,
  },
  {
    type: HomepageOpportunityType.FusePool,
    title: "Rari DAO Fuse Pool",
    subtitle: "Lend and borrow top community assets",
    bgColor: "#00BEFF",
    icon: FuseLogo,
    fusePoolId: 3,
    fuseMetric: FusePoolMetric.TotalSuppliedUSD,
  },
  {
    type: HomepageOpportunityType.EarnPage,
    title: "Earn",
    subtitle: "Sustainable yield made easy",
    bgColor: "#6041FC",
    icon: FuseLogo,
  },
  {
    type: HomepageOpportunityType.FusePage,
    title: "Fuse",
    subtitle: "The first open interest rate market protocol",
    bgColor: "#E6303A",
    icon: FuseLogo,
  },
  {
    type: HomepageOpportunityType.Pool2Page,
    title: "Pool2",
    subtitle: "Rewards for Rari Capital LPs",
    bgColor: "#00BBA8",
    icon: FuseLogo,
  },
  {
    type: HomepageOpportunityType.TranchesPage,
    title: "Tranches",
    subtitle: "Tranche yields across Earn Pools",
    bgColor: "#F45C30",
    icon: FuseLogo,
  },
];

export const HOMEPAGE_EARN_VAULTS: HomepageOpportunity[] = [
  {
    type: HomepageOpportunityType.EarnVault,
    title: "USDC Pool",
    subtitle: "Earn interest on USDC deposits",
    bgColor: "#1079FD",
    icon: FuseLogo,
    vaultType: Pool.USDC,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "ETH Pool",
    subtitle: "Earn interest on ETH Deposits",
    bgColor: "#A5A7ED",
    icon: FuseLogo,
    vaultType: Pool.ETH,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "Yield Pool",
    subtitle: "Earn interest on YIEYieldLD deposits",
    bgColor: "#101111",
    icon: FuseLogo,
    vaultType: Pool.YIELD,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "USDC Pool",
    subtitle: "Earn interest on USDC deposits",
    bgColor: "#1079FD",
    icon: FuseLogo,
    vaultType: Pool.USDC,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "ETH Pool",
    subtitle: "Earn interest on DAI deposits",
    bgColor: "#A5A7ED",
    icon: FuseLogo,
    vaultType: Pool.ETH,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "Yield Pool",
    subtitle: "Earn interest on Yield deposits",
    bgColor: "#101111",
    icon: FuseLogo,
    vaultType: Pool.YIELD,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "USDC Pool",
    subtitle: "Earn interest on USDC deposits",
    bgColor: "#1079FD",
    icon: FuseLogo,
    vaultType: Pool.USDC,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "ETH Pool",
    subtitle: "Earn interest on DAI deposits",
    bgColor: "#A5A7ED",
    icon: FuseLogo,
    vaultType: Pool.ETH,
  },
  {
    type: HomepageOpportunityType.EarnVault,
    title: "Yield Pool",
    subtitle: "Earn interest on Yield deposits",
    bgColor: "#101111",
    icon: FuseLogo,
    vaultType: Pool.YIELD,
  },
];

export const ABILLY = 1e9;
