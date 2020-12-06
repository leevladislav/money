import {RelationOfWallets} from './wallets.interfaces';

export interface Expense {
  expense: number;
  date: string;
  category: string;
  wallet: string;
  description?: string | null;
  _id?: string;
}

export interface ExpenseApiWithWallets {
  expenses: Expense[];
  wallets: RelationOfWallets;
}

export interface ExpenseHistoryFilter {
  start: Date;
  end: Date;
}
