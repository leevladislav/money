export interface WalletCreateParams {
  name: string;
  budget: number;
  iconName?: string;
}

export interface WalletUpdateParams {
  id: string;
  name: string;
  budget: number;
  iconName?: string;
}

export interface Wallet {
  name: string;
  budget: number;
  iconName?: string;
  user?: string;
  _id?: string;
}

export interface RelationOfWallets {
  [propName: string]: Wallet;
}
