export interface WalletCreateParams {
  name: string;
  budget: number;
  image?: File;
}

export interface WalletUpdateParams {
  id: string;
  name: string;
  budget: number;
  image?: File;
}

export interface Wallet {
  name: string;
  budget: number;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface RelationOfWallets {
  [propName: string]: Wallet;
}
